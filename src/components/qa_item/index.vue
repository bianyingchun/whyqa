<template>
    <div :class="['qa_item',{'edit':is_editing}]">
        <template v-if="is_editing">
            <div class="item_q">
                <div class="pre_title">Q</div>
                <textarea class="text" v-model="qa.question">A</textarea>
                <div class="tool">
                    <span @click="ensure()" class="iconfont icon-select"></span>
                    <span @click="cancel()" class="iconfont icon-cancel"></span>
                </div>
            </div>
            <div class="item_a" v-for="(answer, index) in qa.answers" :key="index">
                <div class="pre_title">A</div>
                <div class="text">{{answer.text}}</div>
            </div>   
        </template>
        <template v-else>
            <div class="item_q">
                <div class="pre_title">Q</div>
                <div class="text">{{qa.question}}</div>
                <div class="tool">
                    <span @click="edit()" class="iconfont icon-Edit"></span>
                    <span @click="deleteQA()" class="iconfont icon-delete"></span>
                </div>
            </div>
            <div class="item_a" v-for="(answer, index) in qa.answers" :key="index">
                <div class="pre_title">A</div>
                <div class="text">{{answer.text}}</div>
            </div>  
        </template>                  
    </div>
    

</template>
<script>

export default {
    props:{
        is_editing:{
            type:Boolean,
            default:false
        },
        qa:Object
    },
    methods:{
        ensure(){
            this.$emit('ensure');
        },
        cancel(){
            this.$emit('cancel');
        },
        edit() {
            this.$emit('edit');
        },
        deleteQA(){
            this.$emit('delete');
        }
    }
}
</script>
<style lang="scss" scoped>
.qa_item{
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    line-height: 2rem;
    .item_q,.item_a{
        display: flex;
        .pre_title,.tool{
            display: flex;
        }
        .tool span{
            margin-left:8px;
        }
        .text{
            flex:1;
            padding: 0 0.2rem;
            line-height: 2rem;
        }
        textarea{
            outline: none;
            resize: none;
            background: none;
            border: none;
            color: #2c3e50;
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
        }
    }
    &.edit{
        background:#fff;
        .text{
            overflow-y:auto;
            flex:1;
            background: #fff;
            border:1px solid #ddd;
            border-radius: 5px;
            margin:5px;
            height: 2rem;
            padding: 0 0.2rem;
            line-height: 2rem;                           
        }   
    }
}

</style>