import { combineReducers } from "redux";
// import { connectRouter } from "connected-react-router";
import envReducer from "./env/reducer";

export default function createRootReducer() {
  return combineReducers({
    // router: connectRouter(history),
    env: envReducer
  });
}
