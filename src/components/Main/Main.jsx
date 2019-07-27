import React, {Component} from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom'
import TopBar from "../TopBar/TopBar";
import LeftNav from "../LeftNav/LeftNav"

class Main  extends Component {
    render () {
        return (
            <Router>
                <div className={'router'}>
                    <LeftNav />
                    <TopBar />
                </div>
            </Router>
        );
    }
}


export default Main