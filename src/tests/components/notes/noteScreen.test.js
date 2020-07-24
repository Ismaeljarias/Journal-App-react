import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import "@testing-library/jest-dom";
import { activeNote } from "../../../actions/notes";
import NoteScreen from "../../../components/notes/NoteScreen";

jest.mock("../../../actions/notes", () => ({
  activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "1",
    name: "Ismael",
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: 1234,
      title: "Hola soy Goku",
      body: "World",
      date: 0,
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);

describe("<NoteScreen />  Tests", () => {
  test("should display correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should trigger activeNotes", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola soy Goku",
      },
    });
    expect(activeNote).toHaveBeenLastCalledWith(1234, {
      title: "Hola soy Goku",
      body: "World",
      id: 1234,
      date: 0,
    });
  });
});
