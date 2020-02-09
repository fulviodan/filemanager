import { ADD_ENTRY, DELETE_ENTRY, FOLDER } from "./actionTypes";
import { DeleteEntry, AddEntry } from "../../utils/fileSystem";
import generatedummyFileSystem from "../../utils/dummyFileSystem";

const dummyFileSystem = generatedummyFileSystem();

export default function fileSystemReducer(data = dummyFileSystem, action) {
  switch (action.type) {
    case ADD_ENTRY: {
      const newEntry = action.payload;
      return AddEntry(data, newEntry);
    }

    case DELETE_ENTRY: {
      return DeleteEntry(data, action.payload);
    }

    default:
      return data;
  }
}
