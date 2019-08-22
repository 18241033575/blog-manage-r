import React, {Component} from 'react';
import { Input } from 'antd'
const Textarea = Input.TextArea;

class Disclaimer  extends Component {
    render () {
      return(
          <Textarea value={'12345678'} />
      );
    }
}
export default Disclaimer