import React, {Component} from 'react';
import {
    NavLink
}from "react-router-dom"
import "./LeftNav.css"
class LeftNav  extends Component {
    render () {
      return(
          <div className={'menu'}>
              <div className="logo">
                  <img src={require('../../static/img/React.png')} alt=""/><span>后台管理系统</span>
              </div>
              <div className="aside_nav">
                  <ul>
                      <li><NavLink exact activeClassName={'nav_active'} to="/"><i className={'iconfont icon-home'}></i>首页</NavLink></li>
                      <li><NavLink activeClassName={'nav_active'} to="/line">文章管理</NavLink></li>
                      <li><NavLink activeClassName={'nav_active'} to="/circle">评论列表</NavLink></li>
                      {/*<li><NavLink activeClassName={'nav_active'} to="/test/circle">测试页</NavLink></li>*/}
                  </ul>
              </div>
          </div>
      );
    }
}
export default LeftNav