import React, {Component} from 'react';
import { Table, Input, Button, Modal } from 'antd';
import { showMessage } from '../Untils/untils'
import './NetSetting.css'

export default  class NetSetting  extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'ID',
                dataIndex: '_id',
            },
            {
                title: '设置键名',
                dataIndex: 'keyName',
            },
            {
                title: '设置键值',
                dataIndex: 'value',
                width: '30%'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    (
                        <span>
                            <span className={'edit'} onClick={this.setEdit.bind(this, record.keyName, record.value, record._id)}>编辑</span>
                            <span className={'delete'} onClick={this.categoryDel.bind(this, record._id)}>删除</span>
                        </span>
                    ),
            },
        ];

        this.state = {
            dataSource: [],
            count: 0,
            visible: false,
            keyName: '',
            value: '',
            netOrg: 'add',
            confirmModal: false
        };

    }
    // 编辑类别
    setEdit = (keyName, value, id) => {
        this.setState({
            visible: true,
            keyName: keyName || '',
            value: value || '',
            netOrg: 'edit',
            _id: id
        });
    };
    // 删除类别
    categoryDel = (id) => {
        this.setState({
            confirmModal: true,
            _id: id,
            netOrg: 'delete'
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
        if (this.state.keyName.trim() === '') {
            showMessage('设置键名不能为空', 'error');
            return
        }
        if (this.state.value.trim() === '') {
            showMessage('设置键值不能为空', 'error');
            return
        }
        this.setNetData();
    };
    // 动态改变input值 -- key
    onChangeKey = e => {
        this.setState({
            keyName: e.target.value,
        });
    };
    // 动态改变input值 -- value
    onChangeVal = e => {
        this.setState({
            value: e.target.value,
        });
    };
    // 初始化请求数据
    componentWillMount() {
        this.getSetData()
    }
    // 添加分类
    handleAdd = () => {
        this.setState({
            visible: true,
            netOrg: 'add',
            keyName: '',
            value: ''
        });
    };
    // 确定删除分类
    confirmModalOk = () => {
        this.setNetData();
    };

    confirmModalCancel = () => {
        this.setState({
            confirmModal: false,
        });
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
    // 获取分类数据
    getSetData = () => {
        fetch('http://localhost:8778/netSetting')
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {
                    res.data.forEach((item, index) => {
                        item.key = item._id;
                    });
                    this.setState({
                        dataSource: res.data,
                        count: res.data.length
                    });
                }
            })
    };

    // 操作设置数据
    setNetData = () => {
        fetch('http://localhost:8778/netSetting', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'type=' + this.state.netOrg + '&keyName='+this.state.keyName + '&value=' + this.state.value + '&_id=' + this.state._id
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {
                    this.getSetData();
                    showMessage(res.msg, 'success');
                    switch (this.state.netOrg) {
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
                    新增设置
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
                <Modal
                    title="新增设置"
                    centered
                    visible={this.state.visible}
                    onOk={() => this.setModalVisibleOk(false)}
                    onCancel={() => this.setModalVisible(false)}
                >
                    <Input placeholder="请输入设置键名" allowClear value={this.state.keyName} onChange={this.onChangeKey} />
                    <Input style={{ marginTop: 10 }} placeholder="请输入设置键值" allowClear value={this.state.value} onChange={this.onChangeVal} />
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

