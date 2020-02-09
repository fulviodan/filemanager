import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// We'll use redux-logger just as an example of adding another middleware
import logger from "redux-logger";
// And use redux-batch as an example of adding enhancers
import { reduxBatch } from "@manaflair/redux-batch";
import envReducer from "./env/reducer";
const reducer = {
  env: envReducer
};
const middleware = [...getDefaultMiddleware(), logger];
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
