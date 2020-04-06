<template>
    <div class="extact_item" v-if="current_article">
        <div class="suspend_pannel">
            <span @click="toggle_fav(current_article.id)" class="iconfont icon-bookmark-star" :class="{'active':current_article.fav}"></span>
        </div>
        <h4 class="content_title">{{current_article.title}}</h4>
        <div class="p_list">
            <div class="p_item" v-for="(paragraph, p_index) in paragraphs" :key="paragraph.id">
                <div class="p_context" @mousedown="hideSelect" @mouseup="showSelect" :class="{'selectable':selectable && current_paragraph && current_paragraph.id ===paragraph.id}">{{paragraph.context}}</div>
                <div class="toolbar">
                    <button @click="merge_to_prev(p_index)" v-if="p_index" class="edit_btn">与上段合并</button>
                </div>
                <div class="qa_list">
                    <div class="header">
                        <div class="title">问题列表</div>
                        <div class="edit_tools">
                            <!-- <span @click="toggle(p_index)">+
                                </span> -->
                            <span @click="showCreateQa(p_index)" class="iconfont icon-add"></span>
                            <!-- <span>></span> -->
                        </div>
                    </div>
                    <qa_item v-if="state ==='create' && current_paragraph && current_paragraph.id === paragraph.id" 
                    :qa="qa_template" :is_editing="true" @ensure="saveQA(p_index)" @cancel="exitEdit()">
                    </qa_item>
                    <qa_item v-for="(qa, index) in paragraph.qas" :key="p_index +'_'+index" :qa="qa" 
                    :is_editing="current_paragraph && current_paragraph.id === paragraph.id && edit_qa_index===index"
                    @ensure="updateQA(paragraph, index)" @cancel="cancelEdit()" @delete="deleteQA(p_index, index)"  @edit="setEditIndex(p_index, index)">
                    </qa_item>
                </div>
            </div>
        </div>
        <div class="select_pannel" :style="{'top':select_end_position.top, 'left':select_end_position.left}" v-if="selected_answer">
            <span @click.stop="selectAnswer">选择</span>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import qa_item from './qa_item/index.vue'

export default {
    data() {
        return {
            qa_template:{
                question:'',
                answers:[{
                    text:'',
                    answer_start:-1,
                }]
            },
            selectable : false,
            selected_answer:null,
            select_end_position:{
                top:0,
                left:0
            },
            edit_qa_index:-1,
            state:'read'
        }
    },
    created() {
        console.log('created')
        const id = this.$route.params.id;
        this.get_article_paragraphs(id);
    },
    computed:{
        ...mapGetters('extact_qa', [
            'current_article',
            'paragraphs',
            'current_paragraph'
        ])
    },
    methods:{
        ...mapMutations('extact_qa', [
          'set_current_paragraph_index',
        //   'set_current_paragraph_qa '
        ]),
        ...mapActions('extact_qa',[
            'add_qa',
            'update_qa',
            'delete_qa',
            'get_article_paragraphs',
            'merge_to_prev',
            'toggle_fav'
        ]),
       
        showCreateQa(index) {
            if(this.state !== 'read') return;
            this.set_current_paragraph_index(index);
            this.selectable = true;
            this.state = 'create';
        },
        setEditIndex(p_index, index) {
            if(this.state !== 'read') return;
            this.set_current_paragraph_index(p_index);
            this.edit_qa_index = index;
            this.state = 'edit';
            this.selectable = true;
            this.qa_template = Object.assign({},this.current_paragraph.qas[index]);
        },
        updateQA(paragraph, index) {
            let new_qa = this.current_paragraph.qas[index];
            this.update_qa({qa:new_qa, pid:paragraph.id, index:index}).then(res =>{
                this.exitEdit()
            }).catch(err =>{
                console.log('修改失败')
                this.cancelEdit();
            })
        },
        cancelEdit(){
            this.current_paragraph.qas[this.edit_qa_index] = this.qa_template;
            this.exitEdit();
        },
        exitEdit(){
            this.set_current_paragraph_index(-1);
            this.edit_qa_index = -1;
            this.state = 'read';
            this.selectable = false;
            this.qa_template = {
                question:'',
                answers:[{
                    text:'',
                    answer_start:-1,
                }]
            };
        },
        hideSelect(e) {
            if(!this.selectable) return;
            this.resetSelect();
        },
        showSelect(e){
            let a = window.getSelection();
            let end = a.focusOffset;
            let start = a.anchorOffset;
            if(end === start) {
                this.selected_answer = null;
                return;
            } else if(end < start) {
                let temp = end;
                end = start;
                start = temp;
            }
            this.selected_answer = {
                answer_start : start,
                text:this.current_paragraph.context.slice(start, end)
            }
            this.select_end_position = {
                left:e.clientX+'px',
                top:(e.clientY-20)+'px'
            }
        },
        selectAnswer(){
            if(this.state == 'edit') {
                this.current_paragraph.qas[this.edit_qa_index].answers = [Object.assign({}, this.selected_answer)];
            } else {
                this.qa_template.answers =[Object.assign({}, this.selected_answer)] ;
            }
            this.resetSelect();
            window.getSelection().empty()
        },
        resetSelect(){
            this.selected_answer = null,
            this.select_end_position = {
                top:0,
                left:0
            }
        },
        saveQA(p_index) {
            let q = this.qa_template.question;
            if(!q) return;
            let answer = Object.assign({}, this.qa_template.answers[0]);
            let qa = {
                question:q,
                answers:[answer]
            }
            this.add_qa({
                p_index,
                qa
            }).then(res =>{
                this.exitEdit();
            }).catch(err =>{
                console.log('新增失败')
            });
        },
        deleteQA(p_index, index) {
            if(this.state !=='read') return;
            this.delete_qa({index, p_index}).then(res =>{
                console.log('删除完成')
            }).catch(err=>{
                console.log('删除失败')
            })
        },
    },
    components:{
        qa_item
    },
    watch:{
        '$route'(to, from){
            console.log('watch!')
            const id = to.params.id;
            this.get_article_paragraphs(id);
        }
    }
}
</script>
<style lang="scss" scoped>
.extact_item{
    position:relative;
    .suspend_pannel{
        position: fixed;
        margin-left:-4rem;
        top:16rem;
        .iconfont{
            font-size: 32px;
            color: #9fa8b0;
            &.active{
                color:orange;
            }
        }
    }
    .select_pannel{
        position: fixed;
        border-radius: 5px;
        background: #425262;
        padding: 5px 10px;
        color: #f5f5f5;
    }
    .p_list{
        .p_item{
            border-bottom:1px solid #ddd;
            padding:1.2rem 0;
            .p_context{
                &.selectable{
                    -moz-user-select:text;
                    -o-user-select:text;
                    -khtml-user-select:text;
                    -webkit-user-select:text;
                    -ms-user-select:text;
                    user-select:text;
                }
            }
            .toolbar{
                .edit_btn{
                    margin:10px 10px 0 0;
                }
            }
            .qa_list{
                border-radius: 5px;
                border:1px solid #ddd;
                margin:1rem 0;
                background: #f3f5f7;
                .header{
                    display: flex;
                    align-items:center;
                    padding: 0.5rem;
                    border-bottom:1px solid #ddd;
                    .title{
                        flex: 1;
                    }
                    .edit_tools{
                        span{
                            display: inline-block;
                            padding: 0.5px;
                            margin-left:10px;
                        }
                    }
                }
                .q_item:last-child{
                    border:none
                }
            }
        }
    }

}


</style>