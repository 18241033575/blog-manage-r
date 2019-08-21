import React, {Component} from 'react';
import { Tabs } from 'antd';
import { Badge } from 'antd';
import { Table } from 'antd'

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

class NewsCenter  extends Component {

    render () {
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];

        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
        ];
      return(
          <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane
                  tab={
                      <span>
                          全部消息
                          <Badge style={{ marginLeft: 5, marginTop: -3}} count={25} />
                      </span>
                  }
                  key="1"
              >
                  <Table dataSource={dataSource} columns={columns} />;
              </TabPane>
              <TabPane tab="通知" key="2">
                  Content of Tab Pane 2
              </TabPane>
              <TabPane tab="评论" key="3">
                  Content of Tab Pane 3
              </TabPane>
          </Tabs>
      );
    }
}
export default NewsCenter