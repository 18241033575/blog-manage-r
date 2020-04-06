import React, {Component} from 'react';
import { Table, Button, Modal, Select } from 'antd';
import { showMessage } from '../Untils/untils'

const authName = {
  5: { name: '网站管理员' },
  9: { name: '超级管理员' }
};


export default  class Administor  extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'ID',
                dataIndex: '_id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '角色名称',
                dataIndex: 'authName',
                width: '30%'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    record.auth === 9 ? null :(
                        <span>
                            <span className={'delete'} onClick={this.adminDel.bind(this, record._id)}>删除</span>
                        </span>
                    ),
            },
        ];

        this.state = {
            dataSource: [],
            count: 0,
            visible: false,
            categoryName: '',
            adminOrg: 'neAdmin',
            confirmModal: false,
            deleteUserId: '',
            selectedUserName: '',
            OPTIONS : []
        };

    }
    // 删除管理员
    adminDel = (_id) => {
        this.setState({
            confirmModal: true,
            deleteUserId: _id
        });
    };
    // 取消
    setModalVisible = () => {
        this.setState({
            visible: false,
        });
    };
    // 保存新增管理员
    setModalVisibleOk = () => {
        if (this.state.selectedUserName.trim() === '') {
            showMessage('请选择人员', 'error');
            return
        }
        fetch('http://localhost:8778/administrator', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'type=addAdmin&value='+this.state.categoryName + '&name=' + this.state.selectedUserName
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {
                    showMessage(res.msg, 'success');
                    this.setState({
                        visible: false
                    });
                    this.getAdminData();
                } else {
                    showMessage(res.msg, 'error')
                }
            })
    };
    // 初始化请求数据
    componentWillMount() {
        this.getAdminData()
    }
    // 添加管理员按钮-- 获取非管理员人员
    handleAdd = () => {
        this.setState({
            visible: true,
            adminOrg: 'neAdmin',
            selectedUserName: ''
        });
        fetch('http://localhost:8778/administrator', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'type=' + this.state.adminOrg + '&value='+this.state.categoryName + '&name=' + this.state.selectedUserName
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        OPTIONS: res.data
                    })
                } else {
                    showMessage(res.msg, 'error')
                }
            })
    };
    // 确定删除管理员
    confirmModalOk = () => {
        fetch('http://localhost:8778/administrator', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'type=delAdmin&value='+this.state.categoryName + '&_id=' + this.state.deleteUserId
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {
                    this.setState({
                        confirmModal: false,
                    });
                    this.getAdminData()
                } else {
                    showMessage(res.msg, 'error')
                }
            })
    };
    // 删除管理员取消按钮
    confirmModalCancel = () => {
        this.setState({
            confirmModal: false,
        });
    };

    // 获取管理员数据
    getAdminData = () => {
        fetch('http://localhost:8778/administrator')
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {
                    res.data.forEach((item, index) => {
                        item.key = item._id;
                        item.authName = authName[item.auth].name
                    });
                    this.setState({
                        dataSource: res.data,
                        count: res.data.length
                    });
                }
            })
    };
    // 监听改变下拉选择
    handleChange = selectedUserName => {
        this.setState({ selectedUserName });
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
                    title: col.title
                }),
            };
        });

        const { selectedUserName } = this.state;
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    新增管理员
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
                    <Select
                        placeholder="请选择"
                        value={selectedUserName}
                        onChange={this.handleChange}
                        style={{ width: '100%' }}
                    >
                        {this.state.OPTIONS.map(item => (
                            <Select.Option key={item.name} value={item.name}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
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

