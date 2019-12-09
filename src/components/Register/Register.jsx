import React, {PureComponent} from 'react';
import ParticleBg from '../ParticleBg/ParticleBg'

import { Input, Button } from 'antd';

import "./Register.css"

export default class Login  extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
/*    toLogin = () =>{
        localStorage.setItem('USER', JSON.stringify(this.state));
        // this.props.getLogin(true)
    };*/

    toLogin = () => {
        this.props.changeLogin(true)
    };

    render () {
        return(
            <div className={'login_bg'}>
                <div className={'login_box'}>
                    <p className={'login_title'}>博客后台</p>
                    <Input.Group>
                        <Input placeholder="用户名" maxLength={10} value={this.state.username} onChange={(e) => {this.setState({username: e.target.value})}} />
                        <Input placeholder="密码" maxLength={16} value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}} type={'password'} />
                        <Input placeholder="重复密码" maxLength={16} value={this.state.confirmPassword} onChange={(e) => {this.setState({confirmPassword: e.target.value})}} type={'password'} />
                    </Input.Group>
                    <Button type="primary" onClick={this.toLogin.bind(this)}>注 册</Button>
                    <div className={"change_login"} onClick={this.toLogin}>
                        去登录
                    </div>
                </div>
                <ParticleBg/>
            </div>
        );
    }
}
