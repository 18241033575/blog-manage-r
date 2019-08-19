import React, {Component} from 'react';
import { Card } from 'antd';

import RadarImg from '../ReactChart/radar'
import DoughnutImg from '../ReactChart/doughnut';
import HomeList from "../HomeList/HomeList";

import './Home.css'
import CountDown from "../CountDown/UnCount";
import Statis from "../Statistic/Statistic";

// import {Bar} from 'react-chartjs-2';
const { Meta } = Card;



// const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//         {
//             label: 'My First dataset',
//             backgroundColor: 'rgba(255,99,132,0.2)',
//             borderColor: 'rgba(255,99,132,1)',
//             borderWidth: 1,
//             hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//             hoverBorderColor: 'rgba(255,99,132,1)',
//             data: [65, 59, 80, 81, 56, 55, 40]
//         }
//     ]
// };


class Home  extends Component {


    render () {
      return(
        <div className={'container'}>
            <div className="chart">
                <div className="radar part">
                    <RadarImg />
                </div>
                <div className="part">
                    <DoughnutImg />
                </div>
                <div className="part">
                    <HomeList />
                </div>
                <div className="part">
                    <CountDown />
                </div>
                <div className="part">
                    <Statis />
                </div>
            </div>
        </div>
      );
    }
}
export default Home


