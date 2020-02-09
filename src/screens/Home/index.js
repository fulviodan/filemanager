import React from "react";
import { connect } from "react-redux";

function Home() {
  return <div>asdasdasdasdasddasd</div>;
}

function mapStateToProps(state, ownProps) {
  return { ...state, ...ownProps };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
