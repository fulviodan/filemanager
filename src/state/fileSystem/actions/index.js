import { ADD_ENTRY, DELETE_ENTRY } from "../actionTypes";

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
