import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    NavLink,
    Switch,
    Route
} from 'react-router-dom'

import {Layout, Menu, Breadcrumb, Icon, Avatar, Badge} from 'antd';
import Login from '../Login/Login'
import './Index.css'
import Home from "../Home/Home";
import Note404 from "../Note404/Note404";
import NetUser from "../NetUser/NetUser";
import NewsCenter from "../NewsCenter/NewsCenter";
import CategorySysterm from "../CategorySysterm/CategorySysterm";
import ArticleList from "../ArticleList/ArticleList";
import CommentManage from "../CommentManage/CommentManage";
import Administor from "../Administor/Administor";
import Schedule from "../Schedule/Schedule";
import NetSetting from "../NetSetting/NetSetting";
import ChangePassword from "../ChangePassword/ChangePassword";
import Disclaimer from "../Disclaimer/Disclaimer";
import BaseMsg from "../BaseMsg/BaseMsg";
import AboutMe from "../AboutMe/AboutMe";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            openKeys: [],
        }
    }

    // 登陆
    getLogin = (state) => {
        this.setState({
            isLogin: state
        })
    };

    componentWillMount() {
        // 暂时做简单登录处理 -- 安全性低
        // 处理思路：拿到账号和密码请求后台，通过给登录状态
        let userInfo = localStorage.getItem('USER');
        userInfo ? this.setState({isLogin: true}) : this.setState({isLogin: false});
    }

    rootSubmenuKeys = ['sub1', 'sub4', 'sub5', 'sub8'];

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
    onItem1 = () => {
        this.setState({
            openKeys: []
        })
    };

    render() {
        const {history} = this.props;
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
                                    <Menu
                                        theme="dark"
                                        defaultSelectedKeys={['1']}
                                        defaultOpenKeys={['sub1']}
                                        mode="inline"
                                        openKeys={this.state.openKeys}
                                        onOpenChange={this.onOpenChange}
                                        inlineCollapsed={this.state.collapsed}
                                    >
                                        <Menu.Item
                                            key="1"
                                            onClick={this.onItem1}
                                        >
                                            <NavLink exact to={'/'}>
                                                <Icon type="home"/>
                                                <span>首页</span>
                                            </NavLink>
                                        </Menu.Item>
                                        <SubMenu
                                            key="sub1"
                                            title={
                                                <span>
                                                  <Icon type="appstore"/>
                                                  <span>应用</span>
                                                </span>
                                            }
                                        >
                                            <SubMenu
                                                key="sub2"
                                                title={
                                                    <span>
                                                  <Icon type="file-protect"/>
                                                  <span>内容系统</span>
                                                </span>
                                                }
                                            >
                                                <Menu.Item key="2">
                                                    <NavLink exact to={'/system/article'}>
                                                        文章列表
                                                    </NavLink>
                                                </Menu.Item>
                                                <Menu.Item key="3">
                                                    <NavLink exact to={'/system/category'}>
                                                        分类管理
                                                    </NavLink>
                                                </Menu.Item>
                                                <Menu.Item key="4">
                                                    <NavLink exact to={'/system/comment'}>
                                                        评论管理
                                                    </NavLink>
                                                </Menu.Item>
                                            </SubMenu>
                                            <SubMenu
                                                key="sub3"
                                                title={
                                                    <span>
                                                  <Icon type="solution"/>
                                                  <span>社区系统</span>
                                                </span>
                                                }
                                            >
                                                <Menu.Item key="5">帖子列表</Menu.Item>
                                                <Menu.Item key="6">回帖列表</Menu.Item>
                                            </SubMenu>
                                            <Menu.Item key="7">
                                                <NavLink exact to={'/system/news'}>
                                                    消息中心
                                                </NavLink>
                                            </Menu.Item>
                                        </SubMenu>
                                        <SubMenu
                                            key="sub4"
                                            title={
                                                <span>
                                                  <Icon type="user"/>
                                                  <span>用户</span>
                                                </span>
                                            }
                                        >
                                            <Menu.Item key="8">
                                                <NavLink exact to={'/user/netuser'}>
                                                    网站用户
                                                </NavLink>
                                            </Menu.Item>
                                            <Menu.Item key="9">
                                                <NavLink exact to={'/user/administor'}>
                                                    后台管理员
                                                </NavLink>
                                            </Menu.Item>
                                            <Menu.Item key="10">
                                                <NavLink exact to={'/user/schedule'}>
                                                    我的日程
                                                </NavLink>
                                            </Menu.Item>
                                        </SubMenu>
                                        <SubMenu
                                            key="sub5"
                                            title={
                                                <span>
                                                  <Icon type="setting"/>
                                                  <span>设置</span>
                                                </span>
                                            }
                                        >
                                            <SubMenu
                                                key="sub6"
                                                title={
                                                    <span>
                                                 <Icon type="radar-chart"/>
                                                  <span>系统设置</span>
                                                </span>
                                                }
                                            >
                                                <Menu.Item key="11">
                                                    <NavLink exact to={'/setting/netsetting'}>
                                                        网站设置
                                                    </NavLink>
                                                </Menu.Item>
                                            </SubMenu>
                                            <SubMenu
                                                key="sub7"
                                                title={
                                                    <span>
                                                  <Icon type="heat-map"/>
                                                  <span>我的设置</span>
                                                </span>
                                                }
                                            >
                                                <Menu.Item key="12">
                                                    <NavLink exact to={'/myset/basemsg'}>
                                                        基本资料
                                                    </NavLink>
                                                </Menu.Item>
                                                <Menu.Item key="13">
                                                    <NavLink exact to={'/myset/changepassword'}>
                                                        修改密码
                                                    </NavLink>
                                                </Menu.Item>
                                            </SubMenu>
                                        </SubMenu>
                                        <SubMenu
                                            key="sub8"
                                            title={
                                                <span>
                                                  <Icon type="crown"/>
                                                  <span>其他</span>
                                                </span>
                                            }
                                        >
                                            <Menu.Item key="14">
                                                <NavLink exact to={'/disclaimer'}>
                                                    <span>
                                                      免责声明
                                                    </span>
                                                </NavLink>

                                            </Menu.Item>
                                            <Menu.Item key="15">
                                                <NavLink exact to={'/aboutme'}>
                                                    <span>个人信息</span>
                                                </NavLink>
                                            </Menu.Item>
                                        </SubMenu>
                                    </Menu>
                                </Sider>
                                <Layout>
                                    <Header style={{background: '#fff', padding: 0}}>
                                        <Avatar size={36} icon="user"/>
                                        <span>{this.state.userMsg.name}</span>
                                        <Badge count={this.state.userMsg.age} showZero>
                                            <Avatar size={36} icon="message">
                                                <a href="#" className="head-example"/>
                                            </Avatar>
                                        </Badge>
                                    </Header>
                                    <Content style={{margin: '0 16px'}}>
                                        <Breadcrumb style={{margin: '16px 0'}}>
                                            <Breadcrumb.Item>User</Breadcrumb.Item>
                                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                                        </Breadcrumb>
                                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                                            <Switch>
                                                <Route exact path={'/'} component={Home}/>
                                                <Route path={'/system/comment'} component={CommentManage}/>
                                                <Route path={'/system/article'} component={ArticleList}/>
                                                <Route path={'/system/category'} component={CategorySysterm}/>
                                                <Route path={'/system/news'} component={NewsCenter}/>
                                                <Route path={'/user/netuser'} component={NetUser}/>
                                                <Route path={'/user/administor'} component={Administor}/>
                                                <Route path={'/user/schedule'} component={Schedule}/>
                                                <Route path={'/setting/netsetting'} component={NetSetting}/>
                                                <Route path={'/myset/changepassword'} component={ChangePassword}/>
                                                <Route path={'/disclaimer'} component={Disclaimer}/>
                                                <Route path={'/myset/basemsg'} component={BaseMsg}/>
                                                <Route path={'/aboutme'} component={AboutMe}/>
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
                            <Login getLogin={this.getLogin} />
                        </div>
                    )
                }
            </Router>
        );
    }
}

export default Index