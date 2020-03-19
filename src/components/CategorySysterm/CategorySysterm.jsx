import React, {Component} from 'react';
import { Table, Input, Button, Popconfirm, Form, Drawer, Modal } from 'antd';
import { showMessage } from '../Untils/untils'

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {

    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}


export default  class CategorySysterm  extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: 'name',
                dataIndex: 'value',
                width: '30%',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <span>
                            <span onClick={this.categoryEdit.bind(this, record.value)}>edit</span>
                            <span onClick={this.categoryDel.bind(this, record.value)}>delete</span>
                        </span>
                    ) : null,
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
    categoryEdit = (name) => {
        console.log(name);
        this.setState({
            visible: true,
            categoryName: name,
            categoryOrg: 'edit'
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
        fetch('http://localhost:8778/category', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'type=' + this.state.categoryOrg + '&value='+this.state.categoryName
        })
            .then(res => {
                console.log(res);
            })
            .then(res => {
                console.log(res);
            })
    };
    onChange = e => {
        this.setState({
            categoryName: e.target.value,
        });
    };
    componentWillMount() {
        fetch('http://localhost:8778/category')
            .then(res => {
                // console.log(res);
                return res.json()
            })
            .then(res => {
                console.log(res);
                if (res.code === 200) {
                    res.data.forEach((item, index) => {
                        item.key = item.id;
                    });
                    this.setState({
                        dataSource: res.data,
                        count: res.data.length
                    });
                }
            })
    }
    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        this.setState({
            visible: true,
            categoryOrg: 'add'
        });
    /*    const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });*/
    };

    confirmModalOk = () => {
        fetch('http://localhost:8778/category', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'type=' + this.state.categoryOrg + '&value='+this.state.categoryName + '&id=3'
        })
            .then(res => {
                console.log(res);
            })
            .then(res => {
                console.log(res);
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

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    新增分类
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

