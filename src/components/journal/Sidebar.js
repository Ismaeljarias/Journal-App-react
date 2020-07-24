import React from "react";
import { useDispatch, useSelector } from "react-redux";
import JournalEntries from "./JournalEntries";
import { startLogout } from "../../actions/auth";
import { startNewNote } from "../../actions/notes";

const Sidebar = () => {
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleAddNew = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar mt-5">
        <h3>
          <i className="far fa-moon"></i>
          <span> {name}</span>
        </h3>

        <button onClick={handleLogout} className="btn">
          Logout
        </button>
      </div>

      <div onClick={handleAddNew} className="journal__new-entry">
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};

export default Sidebar;
