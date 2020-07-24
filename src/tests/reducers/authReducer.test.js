import "@testing-library/jest-dom";
import { types } from "../../types/types";
import { authReducer } from "../../reducers/authReducer";

describe("AuthReducer Tests", () => {
  test("should login", () => {
    const initialState = {};

    const action = {
      type: types.login,
      payload: {
        uid: "abc",
        displayName: "Ismael",
      },
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual({
      uid: "abc",
      name: "Ismael",
    });
  });

  test("should logout", () => {
    const initialState = {
      uid: "sdfghjk",
      name: "Ismael",
    };

    const action = {
      type: types.logout,
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual({});
  });

  test("should not change the state", () => {
    const initialState = {
      uid: "sdfghjk",
      name: "Ismael",
    };

    const action = {
      type: "sdfghj",
    };

    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
