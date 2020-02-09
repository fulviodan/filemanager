import {
  ADD_ENTRY,
  DELETE_ENTRY,
  FOLDER,
  FETCH_ENTRIES_IN_PATH_SUCCESS,
  FETCH_ENTRIES_IN_PATH_ERROR
} from "./actionTypes";
import { DeleteEntry, AddEntry } from "../../utils/fileSystem";
import md5 from "md5";
// import generatedummyFileSystem from "../../utils/dummyFileSystem";

// const dummyFileSystem = generatedummyFileSystem();

export default function fileSystemReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_ENTRIES_IN_PATH_SUCCESS: {
      const newState = {
        ...action.payload.data.reduce((res, next) => {
          // next.size = 223;
          // next.date = "2019-04-07";
          // next.creatorName = "admin";
          next.parentPath = action.payload.currentPath;
          next.parentID = md5(action.payload.currentPath + "__folder__");
          next.id = md5(next.path + next.type);
          next.children = [md5(next.path + next.type)];
          res[next.id] = next;
          return res;
        }, {})
      };

      newState[md5(action.payload.currentPath + "__folder__")] = {
        type: "__folder__",
        name: action.payload.currentPath,
        path: action.payload.currentPath,
        // size: 0,
        // date: "2019-04-07",
        // creatorName: "admin",
        parentPath: null,
        parentID: null,
        children: Object.keys(newState)
      };
      return newState;
    }
    case ADD_ENTRY: {
      const newEntry = action.payload;
      return AddEntry(state, newEntry);
    }

    case DELETE_ENTRY: {
      return DeleteEntry(state, action.payload);
    }

    default:
      return state;
  }
}
