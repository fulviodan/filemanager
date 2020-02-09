import {
  GET_ENV_REQUESTED,
  GET_ENV_SUCCESS,
  GET_ENV_ERROR
} from "./actionTypes";

/**
 * Env reducer
 * @module  {Reducer} envReducer
 *
 * @param {Object} state      The current state
 * @param {Object} action     The action
 *
 * @return {Object}           The new state
 */
export default function envReducer(
  state = { data: undefined, error: undefined },
  action
) {
  switch (action.type) {
    case GET_ENV_REQUESTED:
    case GET_ENV_SUCCESS:
    case GET_ENV_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
