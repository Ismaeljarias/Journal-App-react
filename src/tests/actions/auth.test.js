import "@testing-library/jest-dom";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store"; //ES6 modules

import {
  login,
  logout,
  startLogout,
  startLoginEmailPassword,
} from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe("Auth Actions Tests", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("login and logout should create the correct actions", () => {
    const uid = "asdfgh";
    const displayName = "Ismael";

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });

    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });

  test("should do a startLogout", async () => {
    await store.dispatch(startLogout());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout,
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test("should startLoginEmailPassword", async () => {
    await store.dispatch(startLoginEmailPassword("test@testing.com", "123456"));

    const actions = store.getActions();

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: "JKb1aj2qkVVudXoZx3DjfcuKYuJ3",
        displayName: null,
      },
    });
  });
});
