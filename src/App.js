import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import Home from "./screens/Home";
import { updateEnv } from "./state/env/actions";

function App({ updateEnv, env, history }) {
  useEffect(() => {
    updateEnv();
  }, []);
  return (
    !env.isLoading &&
    !!env.data && (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route render={() => <div>Miss</div>} />
        </Switch>
      </ConnectedRouter>
    )
  );
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
