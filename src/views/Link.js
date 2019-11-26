import React, { Component } from "react";

class Link extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.link.name} ({this.props.link.email})
        </div>
      </div>
    );
  }
}

export default Link;
