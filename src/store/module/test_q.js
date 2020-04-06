import {get_record_info, match_qs, add_record} from '@/api/test_q.js'
import origin_questions from '@/api/origin_questions.js'
const test_q = {
	namespaced: true,
	state:{
        is_sending:false,
        record_info:{
            list:[],
            hit_num:0,
            accuracy:'',
            count:0
        },
        origin_questions:origin_questions,
        // current_origin_index:0,
        test_record:{
            origin:null,
            test:'',
            result:null,
            sorted_sim_qs:[],
            correctness:1,
            correct:null
        }
    },
	actions:{
        get_records({commit, state}) {
            return get_record_info().then(res => {
                commit('set_record_info', res.record_info)
            }).catch(err => {
                console.log(err)
            })
        },
        get_result({commit, state}) {
            // console.log(state.test_record)
            if(state.is_sending) return;
            let q = state.test_record.test
            if(!q) {
                alert('问题不得为空')
                return;
            }
            state.is_sending = true;
            match_qs({question:q}).then(res => {
                state.is_sending = false;
                commit('set_test_record', Object.assign(state.test_record, res))
            }).catch(err => {
                state.is_sending = false;
                state.test_record.result = '服务器错误'
            })
        },
        save_record({commit, state}) {
            let record = state.test_record;
            add_record(record).then(res => {
                console.log(record)
                let record_info = state.record_info;
                let list = record_info.list.concat(record);
                let hit_num = record_info.hit_num +  parseInt(record.correctness);
                let num = record_info.num + 1;
                let accuracy = (hit_num/num).toFixed(2);
                commit('set_record_info', {list, hit_num,num, accuracy})
                commit('reset_test')
            }).catch(err => {
                alert('保存测试记录失败！')
                commit('reset_test')
            })
        },
	},
	mutations:{
        reset_test(state) {
            state.test_record = {
                origin:null,
                test:'',
                result:null,
                sorted_sim_qs:[],
                correctness:1,
                correct:null
            }
        },
        set_current_origin_question(state, index) {
            state.test_record = {
                origin:{
                    text:state.origin_questions[index],
                    id:index
                },
                test:'',
                result:null,
                sorted_sim_qs:[],
                correctness:1,
                correct:null
            }
        },
        set_test_record(state, info) {
            state.test_record = info;
        },
        set_correct(state, item){
            state.test_record.correct = item;
        },
        set_record_info(state, info) {
            let {list, hit_num} = info;
            let num = list.length;
            let accuracy = '';
            if(num) {
                accuracy = (hit_num/num).toFixed(2);
            }
            state.record_info = {list, num, accuracy, hit_num}
        }
	},
	getters:{
        origin_questions : state => state.origin_questions,
        record_info : state => state.record_info,
        test_record : state => state.test_record
	}
}

export default test_q
