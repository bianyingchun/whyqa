import request from "./bin";

export function get_q_with_answer(id) {
  return request("/q_with_answer", "get", { id });
}

export function query_q(text) {
  return request("/query_q", "post", { text });
}

export function search (text) {
  return request('/search', 'post', {text})
}

export function update_question (question, from) {
  return request('/update_question', 'post',{question, from})
}

export function get_article (id) {
  return request('/article_info', 'get', {id})
}

export function get_standard_list () {
  return request('/standard_list', 'get')
}

export function get_with_answer_list () {
  return request('/with_answer_list','get')
}

export function get_without_answer_list () {
  return request('/without_answer_list','get')
}