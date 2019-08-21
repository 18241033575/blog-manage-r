import React, {Component} from 'react';
import { Input } from 'antd'

const InputGroup = Input.Group;

class ChangePassword  extends Component {
    render () {
      return(
          <div>
              <InputGroup compact>
                  <label>当前密码</label><Input style={{ width: '20%' }} defaultValue="0571" />
                  <label>当前密码</label><Input.Password placeholder="input password" />
                  <label>当前密码</label><Input.Password placeholder="input password" />
              </InputGroup>
          </div>
      );
    }
}
export default ChangePassword