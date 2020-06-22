import React, {Component} from 'react';
import { Table, Input, Button, Modal, Select, Switch } from 'antd';
import BraftEditor from 'braft-editor';
import { showMessage } from '../Untils/untils'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import HeaderId from 'braft-extensions/dist/header-id'
import store from '../../store/index'

import './ArticleList.css'

const { Option } = Select;

// 配置富文本扩展功能
BraftEditor.use(HeaderId());
BraftEditor.use(CodeHighlighter({
    includeEditors: ['editor-with-code-highlighter'],
}));

export default  class ArticleList  extends Component {
    constructor(props) {
        super(props);
        console.log(store.getState());
        this.storeChange = this.storeChange.bind(this);  //转变this指向
        store.subscribe(this.storeChange);

        this.columns = [
            {
                title: 'ID',
                dataIndex: '_id',
            },
            {
                title: '文章名称',
                dataIndex: 'title',
                // width: '30%'
            },
            {
                title: '简介',
                dataIndex: 'intro',
            },
            {
                title: '所属标签',
                dataIndex: 'tags',
                width: '30%'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    (
                        <span>
                            <span className={'edit'} onClick={this.articleEdit.bind(this, record)}>编辑</span>
                            <span className={'delete'} onClick={this.articleDel.bind(this, record.title)}>删除</span>
                        </span>
                    ),
            },
        ];

        this.state = {
            dataSource: [],
            count: 0,
            visible: false,
            articleTitle: '',
            tags: [],
            articleOrg: 'add',
            confirmModal: false,
            editorState: '', // 设置编辑器初始内容
            outputHTML: '',
            readOnly: true,
            operateTitle: '新增文章',
            children: [],
            defaultTags: [],
            articleIntro: '',
            hot: true
        };

    }
    storeChange(){
        this.setState(store.getState());
        console.log(store.getState());
    }
    // 编辑文章
    articleEdit = (record) => {

        setTimeout(() => {
            this.setState({
                operateTitle: '编辑文章',
                visible: true,
                _id : record._id,
                articleTitle: record.title,
                articleIntro: record.intro,
                defaultTags: [...record.tags.split(',')],
                tags: [...record.tags.split(',')],
                editorState: BraftEditor.createEditorState(record.content),
                outputHTML: record.content,
                articleOrg: 'edit',
                hot: record.hot
            });
            console.log(this.state.defaultTags);
            console.log(this.state.tags);
        })
    };
    // 删除文章
    articleDel = (title) => {
        this.setState({
            confirmModal: true,
            articleTitle: title,
            articleOrg: 'delete'
        });
    };
    // 取消
    setModalVisible = () => {
        this.setState({
            visible: false,
        });
    };
    // 保存分类
    setModalVisibleOk = () => {
        if (this.state.articleTitle.trim() === '') {
            showMessage('文章标题不能为空', 'error');
            return
        }
        this.setArticleData();
    };
    // 动态改变input值
    onChange = e => {
        this.setState({
            articleTitle: e.target.value,
        });
    };
    // 改变intro值
    onIntroChange = e=> {
        this.setState({
            articleIntro: e.target.value
        })
    };
    // 初始化请求数据
    componentWillMount() {
        this.getArticleData();
        this.getCategoryData()
    }
    // 添加分类
    handleAdd = () => {
        this.setState({
            operateTitle: '新增文章',
            visible: true,
            articleOrg: 'add',
            articleTitle: '',
            articleIntro: '',
            editorState: BraftEditor.createEditorState(''),
            defaultTags: [],
            tags: []
        });
        const action = {
          type: 'change_input_value',
          value: '测试测试'
        };
        store.dispatch(action);
        console.log(this.state.defaultTags);
        console.log(this.state.tags);
    };
    // 确定删除分类
    confirmModalOk = () => {
        this.setArticleData();
    };
    // 取消删除
    confirmModalCancel = () => {
        this.setState({
            confirmModal: false,
        });
    };
    // 监听标签变化
    tagsChange = (e) => {
        console.log(e);
        this.setState({
            tags: e
        })
    };
    // 富文本动态赋值
    editorChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
    };


    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    onToggleHot = ()=> {
        this.setState({
            hot: !this.state.hot
        })
    }
    // 获取分类数据
    getCategoryData = () => {
        fetch('http://localhost:8778/category')
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {

                    for (let i = 0; i < res.data.length; i++) {
                        this.state.children.push(<Option key={ res.data[i].value }>{ res.data[i].value }</Option>);
                    }
                }
            })
    };
    // 获取文章数据
    getArticleData = () => {
        fetch('http://localhost:8778/articles')
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {
                    res.data.forEach((item, index) => {
                        item.key = item._id;
                    });
                    console.log(res.data);
                    this.setState({
                        dataSource: res.data,
                        count: res.data.length
                    });
                }
            })
    };

    // 操作文章数据
    setArticleData = () => {
        fetch('http://localhost:8778/articles', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'type=' + this.state.articleOrg + '&title='+this.state.articleTitle
            + '&_id=' + this.state._id + '&tags=' + this.state.tags.join(',') + '&content=' + this.state.outputHTML + '&intro=' + this.state.articleIntro+ '&hot=' + this.state.hot
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {
                    this.getArticleData();
                    showMessage(res.msg, 'success');
                    switch (this.state.articleOrg) {
                        case 'add':
                            this.setState({
                                visible: false
                            });
                            break;
                        case 'edit':
                            this.setState({
                                visible: false
                            });
                            break;
                        default:
                            this.setState({
                                confirmModal: false
                            });
                            break;
                    }
                } else {
                    showMessage(res.msg, 'error')
                }
            })
    };

    render() {
        const { dataSource } = this.state;
        const components = {};
        const {editorState, outputHTML, operateTitle, children, defaultTags} = this.state;
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    新增文章
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
                <Modal
                    title={operateTitle}
                    centered
                    width={'60%'}
                    visible={this.state.visible}
                    onOk={() => this.setModalVisibleOk(false)}
                    onCancel={() => this.setModalVisible(false)}
                >
                    <div className="title">
                        <span>标 题:</span><Input placeholder="请输入标题名称" allowClear  style={{ width: '40%' }} value={this.state.articleTitle} onChange={this.onChange} />
                    </div>
                    <div className="title">
                        <span>简 介:</span><Input placeholder="请输入简介" allowClear  style={{ width: '40%' }} value={this.state.articleIntro} onChange={this.onIntroChange} />
                    </div>
                    <div className="tags">
                        <span>标 签:</span>
                        <Select
                            mode="multiple"
                            style={{ width: '40%' }}
                            placeholder="请选择标签"
                            defaultValue={defaultTags}
                            onChange={this.tagsChange}
                        >
                            {children}
                        </Select>
                    </div>
                    <div className="title">
                        <span>热 门:</span><Switch checked={this.state.hot} onChange={this.onToggleHot.bind(this)} />
                    </div>
                    <BraftEditor
                        id="editor-with-code-highlighter"
                        value={editorState}
                        onChange={this.editorChange}
                    />
                </Modal>

                <Modal
                    title="提示信息"
                    centered
                    visible={this.state.confirmModal}
                    onOk={() => this.confirmModalOk(false)}
                    onCancel={() => this.confirmModalCancel(false)}
                >
                    <p>删除不可恢复，你确定要删除么？</p>
                </Modal>
            </div>
        );
    }
}

