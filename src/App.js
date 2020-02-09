import React, { useEffect } from "react";
import { connect } from "react-redux";
import Home from "./screens/Home";
import { updateEnv } from "./state/env/actions";

function App({ updateEnv, env }) {
  useEffect(() => {
    updateEnv();
  }, []);
  return <>{!env.isLoading && !!env.data && <Home />}</>;
}

function mapStateToProps(state, ownProps) {
  return { ...state, ...ownProps };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEnv() {
      return dispatch(updateEnv());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
