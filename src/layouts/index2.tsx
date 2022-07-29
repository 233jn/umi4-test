import { FC } from "react";
//一旦使用了@umijs/max之后，那么就是 import all from '@umijs/max'
import { Link, NavLink, Outlet } from "@umijs/max";
import styles from '@/layouts/index.less';
import { NavBar, TabBar, Toast } from 'antd-mobile'
import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
const Layout: FC = () => {
    const tabs = [
        {
            key: '/home',
            title: '首页',
            icon: <AppOutline />,
        },
        {
            key: '/todo',
            title: '我的待办',
            icon: <UnorderedListOutline />,
        },
        {
            key: '/message',
            title: '我的消息',
            icon: <MessageOutline />,
        },
  
    ]
    const back = () =>
    Toast.show({
      content: '点击了返回区域',
      duration: 1000,
    })
    return <div>
            <NavBar back='返回' onBack={back}>
          标题
        </NavBar>
        <ul className={styles.navs}  >
            <li>
                <NavLink to="/home" style={({ isActive }) => isActive ? { color: 'red' } : {}}>跳转首页</NavLink>
            </li>
            <li>
                <NavLink to="/docs" style={({ isActive }) => isActive ? { color: 'red' } : {}}>跳转文档页面</NavLink>
            </li>
            <li>
                <NavLink to="/user" style={({ isActive }) => isActive ? { color: 'red' } : {}}>跳转用户页面</NavLink>
            </li>
        </ul>
        <Outlet />
         <div className={styles.box}>
         </div>
        <TabBar className={styles.adsdasd}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    </div>
}

export default Layout