import Login from './system/Login'
import Register from './system/Register'
import NotFound from './system/404'
import Home from './components/Home'
import Checkin from './nav/Checkin'
import Reserve from './nav/Reserve'
import OnlineCategory from './nav/OnlineCategory'
import UserPage from './nav/UserPage'
import RoomPage from './nav/RoomPage'
import RoomCategory from  './nav/RoomCategory'
import CustomerPage from './nav/CustomerPage'


const routes = [
    {
        path: '/login',
        component: Login,
    }, {
        path: '/register',
        component: Register,
    }, {
        path: '/404',
        component: NotFound,
    },
    // {
    //     path: '/home',
    //     component: Home,
    // },
    {
        path: '/home',
        component: Home,
        children: [
            {path: 'checkin', component: Checkin, name: '到店入住'},
            {path: 'reserve', component: Reserve, name: '预定入住'},
            {path: 'onlineCategory', component: OnlineCategory, name: '线上规格管理'},
            {path: 'userPage', component: UserPage, name: '用户管理'},
            {path: 'roomPage', component: RoomPage, name: '房间管理'},
            {path: 'roomCategory', component: RoomCategory, name: '房间规格管理'},
            {path: 'customerPage', component: CustomerPage, name: '住户信息管理'},
            // { path: '/form', component: Form, name: 'Form' },
            // { path: '/user', component: user, name: '列表' },
        ]
    },
]


export default routes;