import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';

export default class HomeTabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: props.selected
        };
    }
    handleChange(){
        this.props.onSelectChange(this.state.selectedTab);
    }
    render() {
        return (
            <div style={{position:'fixed',bottom:0,width:"100%"}}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#dd524d"
                    barTintColor="white">
                    <TabBar.Item
                        title="首页"
                        key="Home"
                        icon={
                            <img className="tabbar-icon" src={require("../images/home.png")}/>
                        }
                        selectedIcon={
                            <img className="tabbar-icon" src={require("../images/home-sel.png")}/>
                        }
                        selected={this.state.selectedTab === 0}
                        badge={1}
                        onPress={() => {
                            this.setState({selectedTab:0},this.handleChange);
                        }}
                        data-seed="logId"
                    >

                    </TabBar.Item>
                    <TabBar.Item
                        title="信息发布"
                        key="Message"
                        icon={
                            <img className="tabbar-icon" src={require("../images/message.png")}/>
                        }
                        selectedIcon={
                            <img className="tabbar-icon" src={require("../images/message-sel.png")}/>
                        }
                        selected={this.state.selectedTab === 1}
                        badge={1}
                        onPress={() => {
                            this.setState({selectedTab:1},this.handleChange);
                        }}
                        data-seed="logId"
                    >

                    </TabBar.Item>
                    <TabBar.Item
                        title="通讯录"
                        key="contact"
                        icon={
                            <img className="tabbar-icon" src={require("../images/contact.png")}/>
                        }
                        selectedIcon={
                            <img className="tabbar-icon" src={require("../images/contact-sel.png")}/>
                        }
                        selected={this.state.selectedTab === 2}
                        badge={1}
                        onPress={() => {
                            this.setState({selectedTab:2},this.handleChange);
                        }}
                        data-seed="logId"
                    >

                    </TabBar.Item>
                    <TabBar.Item
                        title="我的"
                        key="Mine"
                        icon={
                            <img className="tabbar-icon" src={require("../images/mine.png")}/>
                        }
                        selectedIcon={
                            <img className="tabbar-icon" src={require("../images/mine-sel.png")}/>
                        }
                        selected={this.state.selectedTab === 3}
                        badge={1}
                        onPress={() => {
                            this.setState({selectedTab:3},this.handleChange);
                        }}
                        data-seed="logId"
                    >

                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}