import { useEffect, useState } from "react";
import {
  user,
  isUserLoggedIn,
  login,
  logout,
  createAccount,
  getAllNotes,
  deleteNote,
  updateNote,
  addNote,
} from "../lib/pocketbase";
import MDEditor from "@uiw/react-md-editor";
import { useFetchPocketbase } from "../hooks/useFetchPocketbase";

const Home = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [noteName, setNoteName] = useState("");
  const [noteId, setNoteId] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [editorVisible, setEditorVisible] = useState(false);

  const [newNoteName, setNewNoteName] = useState("");

  const { data: notesList } = useFetchPocketbase(getAllNotes);

  useEffect(() => {
    document.title = "Notes App";
  }, []);

  const handleLogin = () => login(loginEmail, loginPassword);

  const handleRegister = () =>
    createAccount(registerName, registerEmail, registerPassword);

  const handleEditNote = (note) => {
    setNoteContent(note.content);
    setEditorVisible(true);
    setNoteId(note.id);
    setNoteName(note.name);
  };

  const handleSaveNote = () => updateNote(noteId, noteName, noteContent);

  const handleCloseEditor = () => {
    setEditorVisible(false);
    setNoteId("");
    setNoteName("");
    setNoteContent("");
  };

  const handleCreateNote = () => addNote(newNoteName, "### New Note");

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b-2 pb-3 mb-4">
        {isUserLoggedIn ? (
          <div>
            <h1 className="text-xl font-bold">Logged in as: {user.record.name}</h1>
            {noteName && (
              <p className="italic">
                Note:{" "}
                <input
                  type="text"
                  className="input input-sm input-bordered ml-2"
                  value={noteName}
                  onChange={(e) => setNoteName(e.target.value)}
                  placeholder="Edit note name"
                />
              </p>
            )}
          </div>
        ) : (
          <h1 className="text-xl font-bold">You are not logged in!</h1>
        )}
        {isUserLoggedIn ? (
          <button className="btn btn-error" onClick={logout}>
            Logout
          </button>
        ) : null}
      </div>

      {/* Login or Register */}
      {!isUserLoggedIn && (
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Login Form */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold">Login</h2>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button className="btn btn-primary w-full" onClick={handleLogin}>
              Login
            </button>
          </div>

          {/* Register Form */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold">Create Account</h2>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Full Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
            />
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button className="btn btn-primary w-full" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      )}

      {/* Editor Section */}
      {isUserLoggedIn && editorVisible && (
        <div className="mb-4">
          <MDEditor value={noteContent} onChange={setNoteContent} />
          <div className="flex gap-3 mt-3">
            <button className="btn btn-success" onClick={handleSaveNote}>
              Save
            </button>
            <button className="btn btn-error" onClick={handleCloseEditor}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Notes Section */}
      {isUserLoggedIn && (
        <div>
          <h2 className="text-xl font-bold mb-4">Your Notes</h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Notes List */}
            <div>
              {notesList?.length > 0 ? (
                notesList.map((note) => (
                  <div
                    key={note.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span
                      className={`cursor-pointer ${note.id === noteId && "font-bold"
                        }`}
                      onClick={() => handleEditNote(note)}
                    >
                      {note.name}
                    </span>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => deleteNote(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>No notes found.</p>
              )}
            </div>

            {/* Create New Note */}
            <div className="border-2 p-4">
              <h3 className="text-lg font-bold mb-3">Create a New Note</h3>
              <input
                type="text"
                className="input input-bordered w-full mb-2"
                placeholder="Note Name"
                value={newNoteName}
                onChange={(e) => setNewNoteName(e.target.value)}
              />
              <button className="btn btn-primary w-full" onClick={handleCreateNote}>
                Create Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Home };
