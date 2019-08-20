import React, {Component} from 'react';
import { Tabs } from 'antd';
import { Badge } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

class NewsCenter  extends Component {

    render () {
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
                  Content of Tab Pane 1
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