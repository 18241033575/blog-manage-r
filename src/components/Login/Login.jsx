import React, {PureComponent} from 'react';
import ParticleBg from '../ParticleBg/ParticleBg'

import { Input, Button } from 'antd';
import { showMessage } from '../Untils/untils'

import "./Login.css"

export default class Login  extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        };
    }
    toLogin = () => {
        // application/x-www-form-urlencoded', }, body: 'key1=value1&key2=value2'
        fetch('http://localhost:8888/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            // body: JSON.stringify(params)
            body: 'username='+this.state.username + '&password='+this.state.password
        }).then((res) => {
                return res.json()
        }).then(res => {
            if (res.code === 200) {
                showMessage(res.msg, 'success', 2, () => {
                    localStorage.setItem('USER', JSON.stringify(this.state));
                    window.location.href = '/'
                });
            } else {
                showMessage(res.msg, 'error')
            }
        }).catch((err) => {
            alert(err)
        })
        // localStorage.setItem('USER', JSON.stringify(this.state));
        // this.props.getLogin(true)
    };

    toRegister = () => {
        this.props.changeLogin(false)
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
                <Button type="primary" onClick={this.toLogin.bind(this)}>登 录</Button>
                <div className="tips_group">
                    <p><span>用户名: </span>admin</p>
                    <p><span>密码: </span>admin</p>
                </div>
                <div className={"change_login"} onClick={this.toRegister}>
                    去注册
                </div>
            </div>
            <ParticleBg/>
        </div>
      );
    }
}
