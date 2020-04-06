import axios from 'axios'

const base_url = 'http://47.100.167.209:8080/';

export function get_record_info() {
    let url = base_url+'get_record_info';
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            let data = res.data;
            if(data.err){
                reject(err)
            } else {
                resolve(data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export function match_qs(params) {
    let url = base_url + 'match_qs';
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            let data = res.data;
            if(data.err){
                reject(err)
            } else {
                resolve(data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export function add_record(params) {
    let url = base_url + 'add_record';
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            let data = res.data;
            if(data.err){
                reject(err)
            } else {
                resolve(data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}


