import React, { Component } from "react";

class Like extends Component {
  render() {
    let classes = "cursor-pointer fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return (
      <i
        onClick={this.props.onClick}
        className={classes}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
