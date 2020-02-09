import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { updateEnv } from "./state/env/actions";
import { fetchEntriesInPath } from "./state/fileSystem/actions";
import styled from "styled-components";
import Navigation from "./components/Navigation";
import SearchBar from "./components/SearchBar";
import Grid from "./components/Grid";

function App({ updateEnv, listFiles, env, router, history }) {
  const isEnvLoaded = !!env.data;
  useEffect(() => {
    updateEnv();
  }, []);

  useEffect(() => {
    if (isEnvLoaded) {
      listFiles({ env, path: router.location.pathname });
    }
  }, [isEnvLoaded]);

  useEffect(() => {
    if (isEnvLoaded) {
      listFiles({ env, path: router.location.pathname });
    }
  }, [router.location.pathname]);
  return (
    !env.isLoading &&
    !!env.data && (
      <ConnectedRouter history={history}>
        <Container>
          <TopBar>
            <Navigation />
            <SearchBar />
          </TopBar>
          <Switch>
            <Route path="*" component={Grid} />
          </Switch>
        </Container>
      </ConnectedRouter>
    )
  );
}

const Container = styled.div`
  padding: 41px;
  margin-left: 320px;
  transition: margin-left 250ms ease-in;
  @media screen and (max-width: 768px) {
    margin-left: 0px;
    padding: 55px 15px 15px 15px;
  }
`;

const TopBar = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

function mapStateToProps(state, ownProps) {
  return { ...state, ...ownProps };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEnv() {
      return dispatch(updateEnv());
    },
    listFiles(payload) {
      return dispatch(fetchEntriesInPath(payload));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
