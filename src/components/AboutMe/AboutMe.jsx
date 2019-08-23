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
                    这是Jayshi的自我描述，喜欢的都系等等东西
                </div>
                <div className="title">
                    技能
                </div>
                <div className="me_skills">
                    <span>Javascript</span>
                    <span>Javascript</span>
                    <span>Javascript</span>
                    <span>Javascript</span>
                    <span>Javascript</span>
                    <span>Javascript</span>
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