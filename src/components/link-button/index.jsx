import React, {Component} from "react"
import "./index.less"

export default class LinkButton extends Component {
    render() {
        return (
            <button className="link-button" onClick={this.props.onClick}>{
                this.props.children
            }</button>
        );
    }
}
