import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "./index.less";
import storageUtils from "../../utils/storageUtils";
import memoryUtils from "../../utils/memoryUtils";
import { Modal, Button } from "antd";

class HeaderCom extends Component {
  logout = () => {
    /* must clear memoryutils and storageutils before redirect
      or it will redirect to admin page again.
    */
    storageUtils.removeUser();
    memoryUtils.user = {};
    console.log(this.props);
    this.props.history.push("/login");
    // event.preventDefault()
  };

  state = {
    logoutIsVisable: false,
    currentTime:new Date().toString()
  };

  interPointer=null;

  componentDidMount(){
    this.interPointer= setInterval(()=>{
      this.setState({
    currentTime:new Date().toString()
      })
    },1000)
  }

  componentWillUnmount(){
    if(this.interPointer) clearInterval(this.interPointer);
  }

  handleCancel = () => {
    this.setState({ logoutIsVisable: false });
  };

  render() {
    const currentPage = this.props.location.pathname.slice(1);
    const user = memoryUtils.user;
    return (
      <div className="header">
        <Modal
          title="Conform"
          visible={this.state.logoutIsVisable}
          onOk={this.logout}
          onCancel={this.handleCancel}
        >
          <p>Do you want to exit?</p>
        </Modal>
        <div className="header-top">
          <span>Welcome, {user.username} !</span>
          <a onClick={() => this.setState({ logoutIsVisable: true })}>Logout</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{currentPage}</div>
          <div className="header-bottom-right">
            <span>{this.state.currentTime}</span>
            <span>dasdasd</span>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderCom);
