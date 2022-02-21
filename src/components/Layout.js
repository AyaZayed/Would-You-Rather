import React, { Component } from "react";
import { connect } from "react-redux";

export class Layout extends Component {
  render() {
    const { authedUser } = this.props;
    return (
      <div>
        {authedUser ? <div>{this.props.children}</div> : <h1>Please Wait</h1>}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps, {})(Layout);
