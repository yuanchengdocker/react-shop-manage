import {lazy} from 'react';
import { LaptopOutlined, ShopOutlined } from '@ant-design/icons';
import dashbord from '../pages/admin/dashbord'

export const mainRoutes = [{
    path: '/login',
    component: lazy(() => import('../pages/Login'))
},{
    path: '/404',
    component: lazy(() => import('../pages/pageNoFound'))
}]

export const adminRoutes = [{
    id: `admin-1`,
    path: '/admin/dashbord',
    // component: lazy(() => import('../pages/admin/dashbord')),
    component: dashbord,
    isShow: true,
    title: '看板',
    icon: LaptopOutlined
},{
    id: `admin-2`,
    path: '/admin/products',
    component: lazy(() => import('../pages/admin/products/List')),
    exact: true,
    isShow: true,
    title: '商品列表',
    icon: ShopOutlined
},{
    id: `admin-3`,
    path: '/admin/products/edit/:id?',
    component: lazy(() => import('../pages/admin/products/Edit')),
    isShow: false
},{
    id: `admin-4`,
    path: '/admin/notices',
    component: lazy(() => import('../pages/admin/notices')),
    isShow: false
}]