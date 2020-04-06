<template>
    <w_layout title="问题测试" class="test_q">
        <div slot="siderbar">
            <div class="question_list">
                <div class="list_item" v-for="(item,index) in origin_questions" :key="index" @click="set_current_origin_question(index)">{{item}}</div>
            </div>
        </div>
        <div slot="content" class="block_wraper">
            <div class="origin_question">
                <div class="title">原始问题<span class="hidden_btn" @click="toggle_ignore_origin">{{ignore_origin ? '显示':'隐藏'}}</span></div>
                <div class="text" v-if="!ignore_origin">{{test_record.origin ? test_record.origin.text:''}}</div>
            </div>
            <div class="test_wraper">
                <div class="title">测试问题</div>
                <div class="input_group">
                    <input placeholder="请输入测试问题" class="test_input" type="text" v-model="test_record.test"/>
                    <button class="test_btn" @click="get_result()">确定</button>
                </div>
            </div>
            <div class="result_wraper">
                <div class="title">检测问题匹配正确性</div>
                <div class="result_content">
                    <div class="title">匹配结果</div>
                    <div class="result">{{test_record.result?test_record.result.text:''}}</div>
                    <div class="title">相似问题</div>
                    <div class="similar_qs">
                        <p v-for="(item, index) in test_record.sorted_sim_qs" :key="index">{{item.text}}</p>
                    </div>
                </div>
                <div class="check_radios">
                    <label><input name="matched" type="radio" :value="correctness[1]" checked v-model="test_record.correctness"/>正确 </label>
                    <label><input name="matched" type="radio" :value="correctness[0]" v-model="test_record.correctness"/>错误</label>
                </div>
            </div>
            <div class="corrections" v-if="!test_record.correctness && test_record.result">
                <div class="title">应匹配为:</div>
                <div class="corrections_list">
                    <div :class="['correct_item', test_record.correct && test_record.correct.id === item.id ? 'active':'']" @click="set_correct(item)" v-for="item in correct_list" :key="item.id">{{item.text}}</div>   
                </div>
            </div>
            <div>
                <button class="save_btn" v-bind:disabled="!save_enable" @click="save_record()">保存记录</button>
            </div>
            <div class="test_records">
                <div class="title">检测记录</div>
                <div class="summary">
                    共计<span class="count">{{record_info.num}}</span>条检测记录，正确率<span class="ratio">{{record_info.accuracy}}</span>
                </div>
                <div class="table_wraper">
                <table border="1" class="records_table">
                  <thead>
                    <tr><th>原始问题</th><th>测试问题</th><th>系统返回</th><th>正确性</th><th>人工更正</th></tr>
                  </thead>
                  <tbody>
                      <tr v-for="(item, index) in record_list" :key="index">
                          <td>{{item.origin ? item.origin.text:''}}</td>
                          <td>{{item.test}}</td>
                          <td>{{item.result.text}}</td>
                          <td>{{parseInt(item.correctness)? '正确':'错误'}}</td>
                          <td>{{item.correct ? item.correct.text:''}}</td>
                      </tr>
                  </tbody>
                </table>
                </div>
            </div>
        </div>
    </w_layout>
</template>
<script>
import w_layout from '@/components/w_layout.vue'
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
    created(){
        this.get_records();
    },
    data() {
        return {
            correctness:[0,1],
            ignore_origin:false,
        }
    },
    components:{
        w_layout
    },
    
    computed:{
        record_list() {
            return this.record_info.list.reverse();
        },
        correct_list() {
            let {origin, sorted_sim_qs, result} = this.test_record;
            let arr = [];
            let ids = [];
            if(origin) {
                arr.push(origin);
                ids.push(origin.id);
            }
            for(let i = 0; i <sorted_sim_qs.length;i++) {
                let item = sorted_sim_qs[i];
                if(ids.indexOf(item.id) === -1 && item.id !== result.id) {
                    arr.push(item)
                }
            }
            if(this.test_record.result.id !== -1) {
                arr.push({
                    id:-1,
                    text:'match nothing'
                })
            }
            console.log(arr)
            return arr;
        },
        save_enable() {
            let {test, result, correct, correctness} = this.test_record;
            if(test && result && (correctness || correct)) {
                return true;
            }
            return false;
        },
        
        ...mapGetters('test_q',[
            'origin_questions',
            'record_info',
            'test_record'
        ]),
    },
    methods: {
        toggle_ignore_origin(){
            this.ignore_origin = !this.ignore_origin;
        },
        ...mapMutations('test_q',[
            'set_current_origin_question',
            'set_correct'
            // 'set_test_record'
        ]),
        ...mapActions('test_q', [
            'get_records',
            'get_result',
            'save_record'
        ]),
    },
    watch:{
        'test_record.correctness':function(newval){//j监听correctness变化,每次correctness变成1时correct = null
            if(newval) {
                this.set_correct(null)
            }
        }
    }    
}
</script>
<style lang="scss" scoped>
.test_q{
    button{
        border-radius: 4px;
        padding: 5px 10px;
        font-size: 14px;
        box-shadow: none;
    }
    .question_list{
        .list_item {
            padding: 10px 10px 10px 20px;
            box-sizing: border-box;
            font-size: 14px;
            cursor:pointer;
            &.active{
                border-left:0.25rem #42b983 solid;
                font-weight: 600;
                color: #42b983;
            }
            &:hover{
                color: #42b983;
            }
        }
    }
    .block_wraper{
        &>div{
            margin-bottom: 30px;
        }
        .title{
            margin: 10px 0;
            font-size: 14px;
        }
        .origin_question {
            .text{
                color:#42b983;
                height: 30px;
                line-height: 30px;
            }
            .hidden_btn{
                color:orange;
                margin-left:20px;
                font-size: 12px;
                cursor: default;
            }
        }
        .input_group{
            display: flex;
            align-items: center;
        }
        .test_input{
            width: 350px;
            font-size: 16px;
            padding: 5px 10px;
            border-radius: 4px;
            border: 1px solid #ced4da;
            margin-right: 10px;
        }
        .test_btn{
            background: #42b983;
            color: #333;
            border: none;
        }
    }
    .result_content{
        width: 350px;
        padding: 5px 10px;
        border-radius: 4px;
        border: 1px solid #ced4da;
        margin-bottom: 10px;
        color:#42b983;
        .title{
            color:#ccc;
            font-size: 14px;
        }
        .result{
            height: 60px;
        }
        .similar_qs{
            height: 120px;
            font-size: 14px;
            line-height: 1.6;
        }
    }
    .check_radios label{
        margin-right: 10px;
    }

    .test_records{
        border-top: 1px solid hsl(203, 41%, 16%);
        padding: 10px 0;
        .summary{
            margin-bottom: 10px;
            span{
                color: #42b983;
                padding: 0 10px;
            }
        }
    }
    .save_btn{
        background: none;
        border: 1px solid #42b983;
        color: #42b983;
        &:disabled{
            color: #545e63;
            border: 1px solid #545e63;
        }
    }
    .table_wraper{
        max-height: 400px;
        overflow-y: auto;
        .records_table{
            width: 100%;
            max-width: 100%;
            border-collapse: collapse;
            thead{
                color:#42b983
            }
            td,th{
                padding: 5px 20px;
            }
        }
    }
    .corrections{
        margin-top:10px;
        .corrections_list{
            padding-left: 70px;
            width:400px;
            .correct_item{
                font-size: 14px;
                padding: 5px 10px;
                &:hover{
                    color: #42b983;
                }
                &.active{
                    color: #42b983
                }
            }
        }
    }
}
</style>