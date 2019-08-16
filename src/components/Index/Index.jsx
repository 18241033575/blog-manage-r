import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    NavLink,
    Switch,
    Route
} from 'react-router-dom'

import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import Login from '../Login/Login'
import './Index.css'
import Home from "../Home/Home";
import Test from "../RouterText/RouterText";
// import Line from "../Line/Line";
import Circle from "../Circle/Circle";
import Note404 from "../Note404/Note404";
import Setting from "../Setting/Setting";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }

    componentWillMount() {
        // 暂时做简单登录处理 -- 安全性低
        // 处理思路：拿到账号和密码请求后台，通过给登录状态
        let userInfo = localStorage.getItem('USER');
        userInfo ? this.setState({isLogin: true}) : this.setState({isLogin: false});
    }

    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    render() {
        return (
            <Router>
                {
                    this.state.isLogin && (
                        <div>
                            <Layout style={{minHeight: '100vh'}}>
                                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                                    <div className="logo">
                                        <img src={require('../../static/img/logo.jpg')} alt="logo"/>
                                    </div>
                                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                        <Menu.Item key="1">
                                            <NavLink  exact to={'/'}>
                                                <Icon type="home"/>
                                                <span>首页</span>
                                            </NavLink>
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <NavLink activeClassName={'ant-menu-item-selected'} exact to={'/settings'}>
                                                <Icon type="desktop"/>
                                                <span>权限设置</span>
                                            </NavLink>
                                        </Menu.Item>
                                        <SubMenu
                                            key="sub1"
                                            title={
                                                <span>
                                                  <Icon type="user"/>
                                                  <span>User</span>
                                                </span>
                                            }
                                        >
                                            <Menu.Item key="3">Tom</Menu.Item>
                                            <Menu.Item key="4">Bill</Menu.Item>
                                            <Menu.Item key="5">Alex</Menu.Item>
                                        </SubMenu>
                                        <SubMenu
                                            key="sub2"
                                            title={
                                                <span>
                                                  <Icon type="team"/>
                                                  <span>Team</span>
                                                </span>
                                            }
                                        >
                                            <Menu.Item key="6">Team 1</Menu.Item>
                                            <Menu.Item key="8">Team 2</Menu.Item>
                                        </SubMenu>
                                        <Menu.Item key="9">
                                            <Icon type="file"/>
                                            <span>File</span>
                                        </Menu.Item>
                                    </Menu>
                                </Sider>
                                <Layout>
                                    <Header style={{background: '#fff', padding: 0}}/>
                                    <Content style={{margin: '0 16px'}}>
                                        <Breadcrumb style={{margin: '16px 0'}}>
                                            <Breadcrumb.Item>User</Breadcrumb.Item>
                                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                                        </Breadcrumb>
                                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                                            <Switch>
                                                <Route exact path={'/'} component={Home}/>
                                                <Route path={'/setting'} component={Setting}/>
                                                <Route path={'/circle'} component={Circle}/>
                                                <Route path={'/test/circle'} component={Test}/>
                                                <Route component={Note404}/>
                                            </Switch>
                                        </div>
                                    </Content>
                                    <Footer style={{textAlign: 'center'}}>Blog Manage ©2019 Created by Jayshi</Footer>
                                </Layout>
                            </Layout>
                        </div>
                    )
                }
                {
                    !this.state.isLogin && (
                        <div className={'router'}>
                            <Login/>
                        </div>
                    )
                }
            </Router>
        );
    }
}

// ReactDOM.render(<Index/>, mountNode);


export default Index
// ReactDOM.render(
//
// );