import {
  GET_ENV_REQUESTED,
  GET_ENV_SUCCESS,
  GET_ENV_ERROR
} from "../actionTypes";
import axios from "axios";
export function updateEnv() {
  return (dispatch, getState) => {
    dispatch({ type: GET_ENV_REQUESTED, payload: { isLoading: true } });
    return axios
      .get(process.env.API_ROOT)
      .then(res => {
        dispatch({
          type: GET_ENV_SUCCESS,
          payload: { isLoading: false, data: res.data }
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ENV_ERROR,
          payload: { isLoading: false, error: err }
        });
      });
  };
}
