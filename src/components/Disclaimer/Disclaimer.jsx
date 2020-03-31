import React, {Component} from 'react';
import BraftEditor from 'braft-editor';

import 'braft-editor/dist/index.css'
import './disclaimer.css'

class Disclaimer extends Component {
    state = {
        editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
        outputHTML: '<p></p>'
    };

    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
    };

    render() {
        const {editorState, outputHTML} = this.state;
        return (
            <div className={'disclaimer'}>
                <div className="title">
                    免责声明
                </div>
                <BraftEditor
                    value={editorState}
                    onChange={this.handleChange}
                />
                <div className="dis_det">
                    {outputHTML}
                    <p>在使用 Jayshi的个人博客后台管理 (以下简称本平台)
                        提供的一切服务前，请务必仔细阅读并理解透彻本声明，您可以选择不使用本平台，但如果您使用本平台，将被视为完全认可此协议及其可能随时更新的内容。</p>
                    <p>本平台保留随时修改服务条款的权利，用户在使用本平台服务时，有必要对最新的服务条款进行仔细阅读和重新确认，当发生有关争议时，以最新的服务条款为准。</p>
                    <p>本平台尊重并保护所有用户的个人隐私权，具体细节可以阅读我们的 隐私保护声明
                        ，您注册的用户名、电子邮件地址、付款账户等个人资料，未经您亲自许可或根据相关法律、法规的强制性规定，本平台不会主动地泄露给第三方。</p>
                    <p>本平台的所有用户在平台内所进行的一切操作均为其个人行为，本平台不会对其进行监督或干涉，也不对其行为承担任何责任。</p>
                    <p>除本平台注明之服务条款外，其他一切因使用本平台而可能遭致的意外、疏忽、侵权及其造成的损失(如:自身密码保管不当导致账户被盗用，经济损失等)，本平台对其概不负责，也不承担任何法律责任。</p>
                </div>
            </div>
        );
    }
}

export default Disclaimer