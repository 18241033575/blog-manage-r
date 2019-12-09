import React, {PureComponent} from 'react';
import ParticleBg from '../ParticleBg/ParticleBg'

import { Input, Button } from 'antd';

import "./Login.css"

class Login  extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    toLogin = () =>{
        localStorage.setItem('USER', JSON.stringify(this.state));
        this.props.getLogin(true)
    };
    render () {
      return(
        <div className={'login_bg'}>
            <div className={'login_box'}>
                <p className={'login_title'}>博客后台</p>
                <Input.Group>
                    <Input placeholder="用户名" maxLength={10} value={this.state.username} onChange={(e) => {this.setState({username: e.target.value})}} />
                    <Input placeholder="密码" maxLength={16} value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}} type={'password'} />
                </Input.Group>
                <Button type="primary" onClick={this.toLogin.bind(this)}>Primary</Button>
                <div className="tips_group">
                    <p><span>用户名: </span>admin</p>
                    <p><span>密码: </span>admin</p>
                </div>
            </div>
            <ParticleBg/>
        </div>
      );
    }
}
export default Login