import { listApi, createApi, modifyApi } from '../../service/products'

export const loadProduct = payload => async dispatch => {
    const res = await listApi()
    // 异步操作派发改变数据
    dispatch({
        type: 'PRODUCT_LOADED',
        payload: res
    })
}

export const addProduct = product => async dispatch => {
    await createApi(product)
    // 异步操作派发改变数据
    dispatch(loadProduct())
}

export const modifyProduct = (id, product) => async dispatch => {
    await modifyApi(id, product)
    // 异步操作派发改变数据
    dispatch(loadProduct())
}