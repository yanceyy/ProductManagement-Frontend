import React, { Component } from "react";
import {withRouter, Link} from 'react-router-dom';
import "./index.less";
import storageUtils from "../../utils/storageUtils";
import memoryUtils from "../../utils/memoryUtils";


class HeaderCom extends Component {

  logout = ()=>{
    /* must clear memoryutils and storageutils before redirect
      or it will redirect to admin page again.
    */
    storageUtils.removeUser()
    memoryUtils.user = {}
    console.log(this.props)
    this.props.history.push("/login");
  }


  render() {
    return <div className="header">
      header
    <Link to="/login" onClick={this.logout}> Logout </Link>
    </div>;
  }
}

export default withRouter(HeaderCom);