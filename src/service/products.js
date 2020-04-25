import {get, post} from '../utils/request'

let count = 0
let dataSource = [{
    id: count++,
    name: '香皂',
    price: 5,
    onsale: true
}, {
    id: count++,
    name: '特仑苏',
    price: 6,
    onsale: true
}, {
    id: count++,
    name: '小浣熊',
    price: 1.5,
    onsale: true
}]

/**
 * 商品列表
 * @param {*} page 
 */
export function listApi(page = 1) {
    return get({code: 200, data: dataSource}, {page})
}

/**
 * 创建商品
 * @param {*} data 
 */
export function createApi(data) {
    dataSource.push({id: count++,onsale: false, ...data})
    return post(dataSource, data)
}

export function getOneById(id) {
    let data = dataSource.filter(d => d.id.toString() === id.toString())
    return get({code: 200, data: (data&&data.length>0 ? data[0] : {})})
}

/**
 * 修改商品
 * @param {*} id 
 * @param {*} data 
 */
export function modifyApi(id, data) {
    dataSource = dataSource.map(d => {
        if(d.id.toString() === id.toString()) {
            Object.assign(d, data)
        }
        return d
    })
    return post(`/api/v1/admin/products/${id}`, data)
}

/**
 * 删除商品
 * @param {*} id 
 */
export function delOne(id) {
    dataSource = dataSource.filter(d => d.id.toString() !== id.toString())
    return post(`/api/v1/admin/products/del/${id}`)
}

