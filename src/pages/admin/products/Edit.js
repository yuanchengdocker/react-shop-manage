import React, {useState, useEffect} from 'react'
import {Form, Card, Input, Button, message, InputNumber, Upload, Modal} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {getOneById} from '../../../service/products'

import {connect} from 'react-redux'
import {addProduct, modifyProduct} from '../../../store/actions/product'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
const formRef = React.createRef()

function Edit(props) {
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const [previewImage, setpreviewImage] = useState('')
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewTitle, setPreviewTitle] = useState('')
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(''))
    
    const {id} = props.match.params
    const isEdit = id !== null && id !== undefined
    useEffect(()=>{
        if(isEdit) {
            getOneById(id).then((res) => {
                formRef.current.setFieldsValue(res.data)
                setImgUrl(res.data.file)
                setEditorState(BraftEditor.createEditorState(res.data.desc))
            }).finally(()=>{})
        }
        return ()=>{
        }
    }, [id, isEdit]) // 第二个参数相当于 比较scu 时候是否更新组件，即调用第一个函数参数

    const handleSubmit = (e) => {
        setLoading(true)
        e.file = imgUrl
        e.desc = editorState.toHTML()
        let promise = props.dispatch(isEdit ? modifyProduct(id, {...e}) : addProduct({...e}));
        promise.then(()=>{
            setLoading(false)
            message.success(`${isEdit?'修改':'添加'}成功`)
            props.history.push('/admin/products')
        }).finally(()=>{
        })
    }
    const onFinishFailed = errorInfo => {
        message.error(errorInfo.errorFields[0].errors[0])
    };
    const priceValidate = (rule, value) => {
        if(value*1 > 100) {
            return Promise.reject('价格不能大于100')
        } else {
            return Promise.resolve();
        }
    }
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    const handleCancel = () => {
        setPreviewVisible(false)
    };
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setpreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setUploading(true)
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setUploading(false)
                setImgUrl(imageUrl)
            })
        }
        return info && info.fileList;
    };
    const handleEditorChange = (e) => {
        setEditorState(e)
    }
    const uploadButton = (
        <div>
          {uploading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">Upload</div>
        </div>
    );
    return (
        <Card title="商品编辑" extra={<Button onClick={()=>{props.history.push('/admin/products')}}>返回</Button>}>
            <Form ref={formRef} onFinish={handleSubmit} onFinishFailed={onFinishFailed} initialValues={{}}>
                <Form.Item name="name" label="名字" rules={[{ required: true, message: 'Please input 名字' }]}>
                  <Input placeholder="请输入商品名字"/>
                </Form.Item>
                <Form.Item name="price" label="价格" rules={[{ required: true, message: 'Please input 价格' }, {validator: priceValidate}]}>
                  <InputNumber placeholder="请输入商品价格" style={{width: '200px'}}/>
                </Form.Item>
                <Form.Item label="主图">
                    <Upload 
                        name="file"
                        showUploadList={false} 
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76" 
                        listType="picture-card"
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                    {imgUrl ? <img src={imgUrl} alt="主图" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>

                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img alt="商品图" style={{ width: '100%' }} src={previewImage} />
                </Modal>

                <Form.Item label="详情" rules={[{ required: true, message: '请输入详情' }]}>
                    <BraftEditor
                        value={editorState}
                        onChange={handleEditorChange}
                    />
                </Form.Item>
                <Form.Item><Button loading={loading} htmlType="submit" type="primary">保存</Button></Form.Item>
            </Form>
        </Card>
    )
}

export default connect()(Edit)
