import React, {Component} from 'react';
import {
    NavLink
}from "react-router-dom"
import "./LeftNav.css"
class LeftNav  extends Component {
    render () {
      return(
          <div className={'menu'}>
              <div className={'logo'}>
                  <img src={require('../../static/img/React.png')} alt=""/><span>后台管理系统</span>
              </div>
              <div className={'aside_nav'}>
                  <ul>
                      <li><NavLink exact activeClassName={'nav_active'} to="/"><i className={'iconfont icon-home'} />首页</NavLink></li>
                      <li><NavLink activeClassName={'nav_active'} to="/line"><i className={'iconfont icon-wenzhangliebiaoxiangqing'} />文章管理</NavLink></li>
                      <li><NavLink activeClassName={'nav_active'} to="/settings"><i className={'iconfont icon-setting'} />权限设置</NavLink></li>
                      <li><NavLink activeClassName={'nav_active'} to="/circle"><i className={'iconfont icon-navicon-wzgl'} />评论列表</NavLink></li>
                      <li><NavLink activeClassName={'nav_active'} to="/circle"><i className={'iconfont icon-home'} />评论列表</NavLink></li>
                      <li><NavLink activeClassName={'nav_active'} to="/circle">自定义滚动条</NavLink></li>
                      {/*<li><NavLink activeClassName={'nav_active'} to="/test/circle">测试页</NavLink></li>*/}
                  </ul>
              </div>
          </div>
      );
    }
}
export default LeftNav