import React, { Component } from 'react';
import HomeTabBar from './components/tabbar';

require('./css/home.css'); 

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected : 2
        }

        this.selecteChange = (index) => {
            //console.log(a1,a2);
            console.log("select",index);
        }
    }

    render() {
        return (
            <HomeTabBar selected={this.state.selected} onSelectChange={this.selecteChange}></HomeTabBar>
        );
    }
}