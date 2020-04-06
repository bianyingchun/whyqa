import axios from 'axios'

export function get(url, params) {
    params = params || {}
    return new Promise((resolve, reject) => {
        axios.get(url, {params}).then(res => {
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

export function post(url, params) {
    params = params || {};
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