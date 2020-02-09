import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// We'll use redux-logger just as an example of adding another middleware
import logger from "redux-logger";
// And use redux-batch as an example of adding enhancers
import { reduxBatch } from "@manaflair/redux-batch";
import envReducer from "./env/reducer";

const history = createBrowserHistory();

const reducer = {
  router: connectRouter(history),
  env: envReducer
};
const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

const preloadedState = {};

export function createStore() {
  const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
    enhancers: [reduxBatch]
  });
  return store;
}

export { history };
