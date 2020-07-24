import "@testing-library/jest-dom";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store"; //ES6 modules

import {
  startNewNote,
  startLoadingNotes,
  startSaveNote,
  startUploading,
} from "../../actions/notes";

import { types } from "../../types/types";
import { db } from "../../firebase/firebase-config";

jest.mock("../../helpers/fileUpload", () => ({
  fileUpload: jest.fn(() => {
    return "https://hello-goku.com/pic.jpg";
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    uid: "TESTING",
  },
  notes: {
    active: {
      id: "2GGfhAtC77uJtzuj9H3K",
      title: "Hello",
      body: "Goku",
    },
  },
};

let store = mockStore(initialState);

describe("Notes Actions Tests", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("should create a new note StartNewNote", async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    const docId = actions[0].payload.id;
    await db.doc(`/TESTING/journal/notes/${docId}`).delete();
  });

  test("startLoadingNotes should load the notes ", async () => {
    await store.dispatch(startLoadingNotes("TESTING"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test("startSaveNote should update the note", async () => {
    const note = {
      id: "2GGfhAtC77uJtzuj9H3K",
      title: "titulo",
      body: "body",
    };

    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();

    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();

    expect(docRef.data().title).toBe(note.title);
  });

  test("startUploading should update the entry url", async () => {
    const file = new File([], "pic.jpg");
    await store.dispatch(startUploading(file));

    const docRef = await db
      .doc("/TESTING/journal/notes/2GGfhAtC77uJtzuj9H3K")
      .get();
    expect(docRef.data().url).toBe("https://hello-goku.com/pic.jpg");
  });
});
