import React, {Component} from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'ID',
        dataIndex: 'ID',
    },
    {
        title: '用户名',
        dataIndex: 'username',
    },
    {
        title: '头像',
        dataIndex: 'avador',
    },
    {
        title: '手机',
        dataIndex: 'phone',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
    },
    {
        title: '性别',
        dataIndex: 'sex',
    },
    {
        title: 'IP',
        dataIndex: 'IP',
    },
    {
        title: '操作',
        dataIndex: 'operate',
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        ID: i,
        username: `JayShi ${i}`,
        phone: '12547789654',
        sex: 'gg',
        operate: '编辑',
        IP: '192.168.0.1',
        avador: '头像',
        email: '240633896@qq.com'
    });
}

class NetUser  extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [
                {
                    key: 'all-data',
                    text: 'Select All Data',
                    onSelect: () => {
                        this.setState({
                            selectedRowKeys: [...Array(46).keys()], // 0...45
                        });
                    },
                },
                {
                    key: 'odd',
                    text: 'Select Odd Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
                {
                    key: 'even',
                    text: 'Select Even Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
            ],
        };
        return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
    }
}
export default NetUser