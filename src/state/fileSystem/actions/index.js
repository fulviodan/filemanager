import {
  FETCH_ENTRIES_IN_PATH,
  FETCH_ENTRIES_IN_PATH_SUCCESS,
  FETCH_ENTRIES_IN_PATH_ERROR,
  ADD_ENTRY,
  DELETE_ENTRY
} from "../actionTypes";
import { listFiles } from "../../../api";
export function fetchEntriesInPath(payload) {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_ENTRIES_IN_PATH,
      payload: { ...payload, isLoading: true }
    });
    return listFiles(payload)
      .then(res => {
        dispatch({
          type: FETCH_ENTRIES_IN_PATH_SUCCESS,
          payload: {
            isLoading: false,
            data: res.data,
            currentPath: getState().router.location.pathname
          }
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_ENTRIES_IN_PATH_ERROR,
          payload: { isLoading: false, error: err }
        });
      });
  };
}

export function addEntry(entry) {
  return {
    type: ADD_ENTRY,
    payload: entry
  };
}

export function deleteEntry(entry) {
  return {
    type: DELETE_ENTRY,
    payload: entry
  };
}
