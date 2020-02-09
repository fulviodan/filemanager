import { applyMiddleware, createStore, compose } from "redux";
import { createBrowserHistory } from "history";
// import { routerMiddleware } from 'connected-react-router'
import thunk from "redux-thunk";
import createReducers from "./reducersFactory";

// export const history = createBrowserHistory();

const middlewares = [
  thunk
  //   routerMiddleware(history)
];

let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
  const { createLogger } = require("redux-logger");
  const logger = createLogger({
    collapsed: true
  });
  middlewares.push(logger);

  composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: "@hype/onboarding"
      })) ||
    compose;
}

function createMyStore(state) {
  const store = createStore(
    createReducers(),
    state,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
}

export default createMyStore;
