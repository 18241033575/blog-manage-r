import React, {Component} from 'react';
import {Table, Input, Button, Icon} from 'antd';

let userData = [];

export default class NetUser extends Component {

    componentDidMount() {
        fetch('http://localhost:8778/netUser')
            .then(res => {
                return res.json()
            })
            .then((res) => {
                if (res.code === 200) {
                    res.data.forEach((item, index) => {
                        item.key = item.id;
                    });
                    userData = res.data;
                    console.log(userData);
                }
                this.setState({
                    loading: true
                })
            })
            .catch((err) => {

            });
    }

    state = {
        selectedRowKeys: [], // Check here to configure the default column
        searchText: '',
        title: '测试',
        loading: false
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
      /*  render: text => (
            <Highlighter
                highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),*/
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };
    // 编辑类别
    categoryEdit = (name, id) => {
        console.log(name);
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
    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                sorter: (a, b) => a.id - b.id
            },
            {
                title: '用户名',
                dataIndex: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
                filters: [
                    {
                        text: 'Joe',
                        value: 'Joe',
                    },
                    {
                        text: 'Jim',
                        value: 'Jim',
                    },
                    {
                        text: 'Submenu',
                        value: 'Submenu',
                        children: [
                            {
                                text: 'Green',
                                value: 'Green',
                            },
                            {
                                text: 'Black',
                                value: 'Black',
                            },
                        ],
                    }],
                onFilter: (value, record) => record.name.indexOf(value) === 0,
            },
            {
                title: '头像',
                dataIndex: 'avatarUrl',
            },
            {
                title: '手机',
                dataIndex: 'tel',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '性别',
                dataIndex: 'gender',
            },
            {
                title: 'IP',
                dataIndex: 'IP',
                ...this.getColumnSearchProps('IP'),
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    userData.length >= 1 ? (
                        <span>
                            <span onClick={this.categoryEdit.bind(this, record.value, record._id)}>冻结</span>
                            <span onClick={this.categoryDel.bind(this, record.value)}>解冻</span>
                        </span>
                    ) : null,
            }
        ];

        const {selectedRowKeys} = this.state;
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
                        this.setState({selectedRowKeys: newSelectedRowKeys});
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
                        this.setState({selectedRowKeys: newSelectedRowKeys});
                    },
                },
            ],
        };
       return (this.state.loading &&  <Table title={this.title} rowSelection={rowSelection} columns={columns} dataSource={userData}/>);
    }
}