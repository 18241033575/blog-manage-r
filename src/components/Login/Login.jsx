import React, {PureComponent} from 'react';
import ParticleBg from '../ParticleBg/ParticleBg'

import { Input, Button } from 'antd';

import "./Login.css"

class Login  extends PureComponent {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.setState({
            username: '',
            password: ''
        });
    }
    tologin(){
        console.log(1);
        console.log(this.state);
    }
    render () {
      return(
        <div className={'login_bg'}>
            <div className={'login_box'}>
                <p className={'login_title'}>博客后台</p>
                <Input.Group>
                    <Input placeholder="用户名" maxLength={10} value={this.state.username} />
                    <Input placeholder="密码" maxLength={16} value={this.state.username} type={'password'} />
                </Input.Group>
                <Button type="primary" onClick={this.tologin.bind(this)}>Primary</Button>
                <div className="tips_group">
                    <p><span>用户名:</span>admin</p>
                    <p><span>密码:</span>admin</p>
                </div>
            </div>
            <ParticleBg/>
        </div>
      );
    }
}
export default Login