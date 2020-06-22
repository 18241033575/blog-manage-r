import React, {Component} from 'react';
import BraftEditor from 'braft-editor';
import {Button} from 'antd';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import HeaderId from 'braft-extensions/dist/header-id'

import 'braft-extensions/dist/code-highlighter.css'
import 'braft-editor/dist/index.css'
// import './disclaimer.css'
import {showMessage} from "../Untils/untils";

// 配置富文本扩展功能
BraftEditor.use(HeaderId());
BraftEditor.use(CodeHighlighter({
    includeEditors: ['editor-with-code-highlighter'],
}));

class BaseMsg extends Component {
    state = {
        editorState: '', // 设置编辑器初始内容
        outputHTML: '<p></p>',
        readOnly: true
    };

    componentWillMount = () => {
        fetch('http://localhost:8778/aboutme')
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {
                    const cont = res.data[0] ? res.data[0].content: '';
                    this.setState({
                        editorState: BraftEditor.createEditorState(cont)
                    })
                }
            })
    };

    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
    };

    // 编辑富文本
    handleEdit = () => {
        this.setState({
            readOnly: false
        })
    };

    // 取消编辑富文本
    handleCancel = () => {
        this.setState({
            readOnly: true
        })
    };

    // 保存富文本
    handleSave = () => {
        fetch('http://localhost:8778/aboutme', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'content=' + this.state.outputHTML
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {
                    showMessage(res.msg, 'success');
                    this.setState({
                        readOnly: true
                    })
                } else {
                    showMessage(res.msg, 'error')
                }
            })
    };

    render() {
        const {editorState, outputHTML, readOnly} = this.state;
        return (
            <div className={'disclaimer'}>
                {
                    this.state.readOnly && (
                        <Button onClick={this.handleEdit} type="primary" style={{marginBottom: 16}}>
                            编辑
                        </Button>
                    )
                }
                {
                    !this.state.readOnly && (
                        <div>
                            <Button onClick={this.handleCancel} type="default" style={{marginBottom: 16}}>
                                取消
                            </Button>
                            <Button onClick={this.handleSave} type="primary" style={{marginBottom: 16,marginLeft: 10}}>
                                保存
                            </Button>
                        </div>
                    )
                }
                <BraftEditor
                    id="editor-with-code-highlighter"
                    value={editorState}
                    onChange={this.handleChange}
                    readOnly={readOnly}
                />
            </div>
        );
    }
}

export default BaseMsg