import React, {Component} from 'react';
import { Avatar, Icon, Divider } from 'antd';

import './AboutMe.css'

class AboutMe  extends Component {
    render () {
        return(
            <div className={'about_me'}>
                <Avatar size={64} icon="user" alt={'avatar'}/>
                <p className={'name'}>Jayshi</p>
                <p className={'profession'}>前端工程师</p>
                <div className="basmsg">
                    <div className="part">
                        <Icon type="phone" theme="twoTone" />
                        18241033575
                    </div>
                    <div className="part">
                        <Icon type="wechat" style={{ color: '#5bcc44'}} />
                        sl521326
                    </div>
                    <div className="part">
                        <Icon type="qq" style={{ color: '#f92c09'}} />
                        240638896
                    </div>
                </div>
                <Divider />
                <div className="forme">
                    <div className="title">
                        关于我
                    </div>
                    <div className="me_desc">
                        个人还是比较喜欢学习新技术，有兴趣的可以一起探讨学习~~~
                    </div>
                    <div className="title">
                        技能
                    </div>
                    <div className="me_skills">
                        <span>Html(5)</span>
                        <span>CSS(3)</span>
                        <span>Javascript(ES6+)</span>
                        <span>webpack(4)</span>
                        <span>Vue</span>
                        <span>React</span>
                        <span>Angular</span>
                        <span>React-native</span>
                        <span>Flutter</span>
                        <span>Next</span>
                        <span>Nuxt</span>
                        <span>Node</span>
                        <span>Mongodb</span>
                    </div>
                    <div className="money">
                        <img src={require('../../static/img/money.jpg')} alt=""/>
                        <p>谢谢大佬打赏~~~</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default AboutMe