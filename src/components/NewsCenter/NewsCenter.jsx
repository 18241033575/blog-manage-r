import React, {Component} from 'react';
import { Tabs } from 'antd';
import { Badge } from 'antd';
import { Table } from 'antd'

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}
let dataSource = [];
class NewsCenter  extends Component {
    constructor(props) {
        super(props);
        this.state= {
            allNews: '',
            notice: '',
            discuss: ''
        };
    }

    componentWillMount() {
        fetch('http://localhost:8888/message')
            .then(res => {
                console.log(res);
                return res.json()
            })
            .then(res => {
                if (res.code === 200) {
                    res.data.forEach((item, index) => {
                        item.key = item.id;
                    });
                    dataSource = res.data;
                    this.setState({
                        allNews: dataSource.length
                    })
                }
            })
    }
    render () {

        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '所在文章',
                dataIndex: 'article',
                key: 'age',
            },
            {
                title: '评论信息',
                dataIndex: 'explain',
                key: 'address',
            },
        ];
      return(
          <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane
                  tab={
                      <span>
                          全部消息
                          <Badge style={{ marginLeft: 5, marginTop: -3}} count={this.state.allNews} />
                      </span>
                  }
                  key="1"
              >
                  <Table dataSource={dataSource} columns={columns} />
              </TabPane>
              <TabPane tab="通知" key="2">
                  Content of Tab Pane 2
              </TabPane>
              <TabPane tab="评论" key="3">
                  Content of Tab Pane 3
              </TabPane>
          </Tabs>
      )
    }
}
export default NewsCenter