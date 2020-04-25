import React from 'react'
import {withRouter} from 'react-router-dom'
import { Layout, Menu, Dropdown, Avatar, message, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {clearToken} from '../../utils/auth'
import {adminRoutes} from '../../routes'
import {connect} from 'react-redux'
import './frame.css'
import logo from './logo192.png'
const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter(route => route.isShow)
function index(props) {
    const popManu = (<Menu onClick={(p) => {
        if(p.key === 'logout') {
            clearToken()
            props.history.push('/login')
        } else if (p.key === 'noti') {
            props.history.push('/admin/notices')
        } else {
            message.info(p.key)
        }
    }}>
        <Menu.Item key="noti">通知中心</Menu.Item>
        <Menu.Item key="setting">设置</Menu.Item>
        <Menu.Item key="logout">退出</Menu.Item>
    </Menu>)
    return (
        <Layout>
            <Header className="header">
            <div className="logo">
                <img src={logo} alt="logo" style={{height: '30px'}}></img>
            </div>
            <Dropdown overlay={popManu}>
                <div className="admin_cont">
                    <Avatar>U</Avatar>
                    <Badge dot={!props.isAllRead}>
                        <span>超级管理员</span>
                    </Badge>
                    <DownOutlined/>
                </div>
            </Dropdown>
            </Header>
            <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                >
                    {routes.map((route, index) => <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>
                        <route.icon/>{route.title}
                    </Menu.Item>)}
                </Menu>
            </Sider>
            <Layout style={{ padding: '16px' }}>
                <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: '#fff'
                }}
                >
                {props.children}
                </Content>
            </Layout>
            </Layout>
        </Layout>
    )
}

export default connect(state=>state.notice)(withRouter(index))
