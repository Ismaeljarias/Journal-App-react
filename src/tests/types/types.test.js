import "@testing-library/jest-dom";
import { types } from "../../types/types";

describe("Types Tests", () => {
  test("should have this types", () => {
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",

      uiSetError: "[UI] Set Error",
      uiRemoveError: "[UI] Remove Error",

      uiStartLoading: "[UI] Start Loading",
      uiFinishLoading: "[UI] Finish Loading",

      notesAddNew: "[Notes] New note",
      notesActive: "[Notes] Set active note",
      notesLoad: "[Notes] Load notes",
      notesUpdated: "[Notes] Update note saved",
      notesDelete: "[Notes] Delete note",
      notesFileUrl: "[Notes] Updated image url",
      notesLogoutCleaning: "[Notes] Logout Cleaning",
    });
  });
});
