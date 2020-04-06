import {get_article_list, get_article_paragraphs ,post_add_qa, post_update_qa, post_delete_qa, post_merge, post_toggle_fav} from '@/api/extact_qa.js'

const extact_qa = {
	namespaced: true,
	state:{
        articles:[],
        paragraphs:[],
        current_article_index:0,
        current_paragraph_index:-1,
	},
	actions:{
        get_articles({commit, state}) {
            get_article_list().then(res => {
                commit('set_article_list', res.articles);
            }).catch(err => {
                
            })
        },
        get_article_paragraphs({commit, state}, aid) {
            get_article_paragraphs(aid).then(res => {
                commit('set_current_article_index', aid)
                commit('set_paragraph_list',res.paragraphs);
            })
        },
        update_qa({commit, state}, params) {
            return post_update_qa(params);
        },
        add_qa({commit, state}, params) {
            let {qa, p_index} = params;
            let pid = state.paragraphs[p_index].id;
            return post_add_qa({qa, pid}).then(res => {
                state.paragraphs[p_index] = res.paragraph;
                state.paragraphs = Object.assign({},state.paragraphs);
                return Promise.resolve(res.paragraph)
            })
        },
        delete_qa({commit, state}, params) {
            let {index, p_index} = params;
            let pid = state.paragraphs[p_index].id;
            return post_delete_qa({index, pid}).then(res => {
                state.paragraphs[p_index] = res.paragraph;
                state.paragraphs = Object.assign({}, state.paragraphs)
                return Promise.resolve(res.paragraph)
            })
        },
        merge_to_prev({commit, state}, index) {
            let prev_index = index - 1;
            let to = state.paragraphs[prev_index].id;
            let from = state.paragraphs[index].id;
            return post_merge({to, from}).then(res => {
                state.paragraphs.splice(prev_index,2,res.paragraph)
                return Promise.resolve(res.paragraph)
            })
        },
        toggle_fav({commit, state}, aid) {
            return post_toggle_fav({aid}).then(res => {
                state.articles[aid].fav = res.fav;
                state.articles = Object.assign({},state.articles)
                return Promise.resolve(res.fav)
            })
        }
	},
	mutations:{
        set_article_list(state, list) {
            state.articles = list;
        },
        set_paragraph_list(state, list) {
            state.paragraphs = list;
        },
        set_current_article_index(state, index) {
            state.current_article_index = index;
            state.current_paragraph_index = -1;
        },
        
        set_current_paragraph_index(state, index) {
            state.current_paragraph_index = index;
        },
        set_current_paragraph_qa(state, index, qa) {
            // state.paragraphs[state.current_paragraph_index].qas[index] = qa;
        }  
	},
	getters:{
        articles : state => state.articles,
        paragraphs:state => state.paragraphs,
        current_article_index :state => state.current_article_index,
        current_article: state => state.articles[state.current_article_index],
        current_paragraph_index: state => state.current_paragraph_index,
        current_paragraph: state => state.paragraphs[state.current_paragraph_index]
        // current_paragraph: state => {
        //     let article = state.articles[state.current_article_index];
        //     if(article){
        //         return article.paragraph[state.current_paragraph_index];
        //     }
        //     return undefined;
        // }
	}
}

export default extact_qa
