import React, {useState, ConcurrentMode} from 'react'
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {setToken} from '../utils/auth'
import {loginApi} from '../service/auth'
import './login.css'

function Login(props) {
    let [logining, setLogining] = useState(false);
    const onFinish = values => {
        setLogining(true)
        loginApi({
            userName: values.username,
            password: values.password
        }).then((res) => {
            setLogining(false)
            if(res.code === 200) {
                message.success('登陆成功')
                setToken(res.token)
                props.history.push('/admin')
            } else {
                message.error('用户不存在')
            }
        })
        
    };
    return (
        <Card title="QF admin SYS" className="login-form">
            <Form
                name="normal_login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名！' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住我</Checkbox>
                    </Form.Item>

                </Form.Item>

                <Form.Item>
                    <Button loading={logining} type="primary" htmlType="submit" className="login-form-button">
                    登陆
                    </Button>
                </Form.Item>
                </Form>
        </Card>
    )
}

export default Login
