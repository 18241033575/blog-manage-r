import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Switch
} from 'react-router-dom'
import "./static/css/index.css"
import Home from "./components/Home/Home";
import Line from "./components/Line/Line";
import Note404 from "./components/Note404/Note404";
import Circle from "./components/Circle/Circle";

function App() {
    return (
        <Router>
            <div className={'router'}>
                <div className={'menu'}>
                    <div className="logo">
                        <img src={require('./static/img/React.png')} alt=""/><span>China React</span>
                    </div>
                    <div className="aside_nav">
                        <ul>
                            <li><NavLink exact activeClassName={'nav_active'} to="/">首页</NavLink></li>
                            <li><NavLink activeClassName={'nav_active'} to="/line">第二页</NavLink></li>
                            <li><NavLink activeClassName={'nav_active'} to="/circle">第三页</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className={'content'}>
                    <div className={'con_top_nav'}>
                        <ul>
                            <li><a href="/" className={'active'}>BLOG</a></li>
                            <li><a href="/">123</a></li>
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
                            <Route component={Note404} />
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
