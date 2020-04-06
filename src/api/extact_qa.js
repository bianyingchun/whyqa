import {get, post}  from './bin/fetch.js'


export function get_article_list() {
    return get('/articles')
}

export function get_article_paragraphs(aid) {
    return get('/article_paragraphs',{aid})
}

export function post_add_qa(params) {
    return post('/add_qa',params)
}

export function post_update_qa(params) {
    return post('/update_qa', params)
}

export function post_delete_qa(params) {
    return post('/delete_qa', params)
}

export function post_merge(params) {
    return post('/merge', params)
}

export function post_toggle_fav(params) {
    return post('/togglefav',params)
}