import React, {useState, useEffect, useLayoutEffect} from 'react'
import {Card, Button, Table, Popconfirm} from 'antd'
import {connect} from 'react-redux'
import {delOne, modifyApi} from '../../../service/products'
import {loadProduct} from '../../../store/actions/product'
import './list.css'

function List(props) {
    let { list } = props
    let [loading, setLoading] = useState(false)
    useEffect(()=>{
        getProductsList()
    }, [])

    useLayoutEffect(() => { // 跟页面绘制相关，会同步页面样式更新，不会出现样式修改断层
    }, [])

    const getProductsList = async () => {
        setLoading(true)
        await props.dispatch(loadProduct())
        setLoading(false)
    }

    const toDelProduct = (id) => {
        delOne(id).then(getProductsList)
    }

    const columns = [{
        title: '序号',
        key: 'id',
        width: 80,
        align: 'center',
        render: (txt, record, index) => index + 1
    },{
        title: '名字',
        dataIndex: 'name'
    }, {
        title: '价格',
        dataIndex: 'price'
    },{
        title: '图片',
        dataIndex: 'file',
        render: (txt, record) => record.file ? <img alt="商品" className="list-img" src={record.file}/> : '暂无图片'
    },{
        title: '是否在售',
        dataIndex: 'onsale',
        render: (txt, record) => {
            return record.onsale ? '在售' : '已下架'
        }
    },{
        title: '操作',
        render: (txt, record, index) => {
            return (
                <div>
                    <Button type="primary" size="small" onClick={
                        ()=>{props.history.push(`/admin/products/edit/${record.id}`)}
                    }>修改</Button>
                    <Popconfirm title="确定删除此项？"
                        onCancel={()=>{console.log('用户取消删除')}} 
                        onConfirm={() => {toDelProduct(record.id)}}
                    >
                        <Button style={{margin: '0 1rem'}} type="danger" size="small">删除</Button>
                    </Popconfirm>
                    <Button type={record.onsale ? 'default' : 'primary'} size="small" onClick={()=>{
                        setLoading(true)
                        modifyApi(record.id, {onsale: !record.onsale}).then(()=>{
                            setLoading(false)
                            getProductsList()
                        })
                    }
                    }>{record.onsale ? '下架' : '上架'}</Button>
                </div>
            )
        }
    }]
    return (
       <Card title="商品列表" extra={<Button type="primary" size="small" onClick={()=>{props.history.push('/admin/products/edit')}}>新增</Button>}>
           <Table rowClassName={record => record.onsale ? '' : 'bg-no-sale'} loading={loading} rowKey="id" columns={columns} dataSource={list} bordered/>
       </Card>
    )
}

export default connect(state=>state.product)(List)
