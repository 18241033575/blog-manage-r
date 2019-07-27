import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom'
import Test from "../RouterText/RouterText";
import Line from "../Line/Line";
import Note404 from "../Note404/Note404";
import Home from "../Home/Home";
import Circle from "../Circle/Circle";

class TopBar  extends Component {
    render () {
      return(
          <div className={'content'}>
              <div className={'con_top_nav'}>
                  <ul>
                      <li><a href="/" className={'active'}>BLOG</a></li>
                      <li><a href="/" className={''}>123</a></li>
                      <li><a href="/">123</a></li>
                      <li><a href="/">123</a></li>
                      <li><a href="/">123</a></li>
                  </ul>
              </div>
              <div className="show_con">
                  <Switch>
                      <Route exact path={'/'} component={Home}/>
                      <Route path={'/line'} component={Line}/>
                      <Route path={'/circle'} component={Circle}/>
                      <Route path={'/test/circle'} component={Test}/>
                      <Route component={Note404}/>
                  </Switch>
              </div>
          </div>
      );
    }
}
export default TopBar