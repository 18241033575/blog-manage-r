import React, {Component} from 'react';
import {
    NavLink,
} from 'react-router-dom'

class Test  extends Component {
    render () {
      return(
        <div>
            <NavLink to="/circle">测试呀</NavLink>
        </div>
      );
    }
}
export default Test