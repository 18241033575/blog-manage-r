import React, {Component} from 'react';
import { Table, Input, Button, Modal, Select } from 'antd';
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
                            <span className={'delete'} onClick={this.categoryDel.bind(this, record._id)}>删除</span>
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
            OPTIONS : [{name: 'Apples', _id: "1"},{name: 'Nails', _id: "2"},{name: 'Bananas', _id: "3"},{name: 'Helicopters', _id: "4"}]
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
    categoryDel = (_id) => {
        console.log(_id);
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
                    console.log(res);
                    /* switch (this.state.categoryOrg) {
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
                     }*/
                } else {
                    showMessage(res.msg, 'error')
                }
            })
        // this.setCategoryData();
    };
    // 初始化请求数据
    componentWillMount() {
        this.getCategoryData()
    }
    // 添加分类
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
                    console.log(res);
                    this.setState({
                        OPTIONS: res.data
                    })
                   /* switch (this.state.categoryOrg) {
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
                    }*/
                } else {
                    showMessage(res.msg, 'error')
                }
            })
    };
    // 确定删除分类
    confirmModalOk = () => {
        // this.setCategoryData();
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
                    console.log(res);
                    /* switch (this.state.categoryOrg) {
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
                     }*/
                } else {
                    showMessage(res.msg, 'error')
                }
            })
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
        fetch('http://localhost:8778/administrator')
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {
                    console.log(res);
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
        console.log(selectedUserName);
        this.setState({ selectedUserName });
    };

    // 操作分类数据
    setCategoryData = () => {
        fetch('http://localhost:8778/category', {
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

