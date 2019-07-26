import React, {Component} from 'react';

class Home  extends Component {
    render () {
      return(
        <div className={'container'}>
            这是home页面!
            用:after 做出有边框选中状态， :before 和 :after
        </div>
      );
    }
}
export default Home