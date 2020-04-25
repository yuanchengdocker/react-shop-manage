import {post} from '../utils/request'

/**
 * 用户登陆
 * @param {*} user 
 * userName
 * password
 */
export function loginApi(user) {
    return post({
        code: 200,
        token: '123'
    }, user)
}