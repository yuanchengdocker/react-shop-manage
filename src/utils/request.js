import axios from "axios";
import {getToken} from './auth'

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000
})

//  全局请求拦截
instance.interceptors.request.use(function(config) {
    config.headers['authorization'] = `Bearer${getToken()}`
    return config
}, function(error) {
    return Promise.reject(error)
})

instance.interceptors.response.use(function(response) {
    return response.data
}, function(error) {
    return Promise.reject(error)
})

export function get(url, params) {
    // return instance.get(url, {params})
    return buildData(url)
}

export function post(url, data) {
    // return instance.post(url, data)
    return buildData(url)
}

export function buildData(obj) {
    return new Promise((res) => {
        setTimeout(() => {
            res(obj)
        }, 500)
    })
}
