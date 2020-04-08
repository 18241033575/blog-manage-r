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
                title: '设置名称',
                dataIndex: 'value',
                width: '30%'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    (
                        <span>
                            <span className={'edit'} onClick={this.categoryEdit.bind(this, record.value, record._id)}>编辑</span>
                            <span className={'delete'} onClick={this.categoryDel.bind(this, record.value)}>删除</span>
                        </span>
                    ),
            },
        ];

        this.state = {
            dataSource: [],
            count: 0,
            visible: false,
            categoryName: '',
            categoryOrg: 'add',
            confirmModal: false
        };

    }
    // 编辑类别
    categoryEdit = (name, id) => {
        this.setState({
            visible: true,
            categoryName: name,
            categoryOrg: 'edit',
            _id : id
        });
    };
    // 删除类别
    categoryDel = (name) => {
        this.setState({
            confirmModal: true,
            categoryName: name,
            categoryOrg: 'delete'
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
        if (this.state.categoryName.trim() === '') {
            showMessage('类别名称不能为空', 'error');
            return
        }
        this.setCategoryData();
    };
    // 动态改变input值
    onChange = e => {
        this.setState({
            categoryName: e.target.value,
        });
    };
    // 初始化请求数据
    componentWillMount() {
        this.getCategoryData()
    }
    // 添加分类
    handleAdd = () => {
        this.setState({
            visible: true,
            categoryOrg: 'add',
            categoryName: ''
        });
    };
    // 确定删除分类
    confirmModalOk = () => {
        this.setCategoryData();
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
    getCategoryData = () => {
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

    // 操作分类数据
    setCategoryData = () => {
        fetch('http://localhost:8778/netSetting', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'type=' + this.state.categoryOrg + '&value='+this.state.categoryName + '&_id=' + this.state._id
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {
                    this.getCategoryData();
                    showMessage(res.msg, 'success');
                    switch (this.state.categoryOrg) {
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
                    title="新增类别"
                    centered
                    visible={this.state.visible}
                    onOk={() => this.setModalVisibleOk(false)}
                    onCancel={() => this.setModalVisible(false)}
                >
                    <Input placeholder="请输入类别名称" allowClear value={this.state.categoryName} onChange={this.onChange} />
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

