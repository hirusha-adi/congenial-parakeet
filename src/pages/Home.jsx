import { useEffect, useState } from "react";
import { user, isUserLoggedIn, login, logout, createAccount, getAllNotes, deleteNote } from "../lib/pocketbase"
import MDEditor from '@uiw/react-md-editor';
import { useFetchPocketbase } from "../hooks/useFetchPocketbase";


const Home = () => {

  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const [userCreateName, setUserCreateName] = useState("")
  const [userCreateEmail, setUserCreateEmail] = useState("")
  const [userCreatePassword, setUserCreatePassword] = useState("")

  const [currentNoteId, setCurrentNoteId] = useState("")
  const [currentNoteContents, setCurrentNotesContents] = useState("")
  const [showEditor, setShowEditor] = useState(false)

  const { data: allNotesList } = useFetchPocketbase(getAllNotes);

  console.log(allNotesList)


  useEffect(() => {
    document.title = `Notes app`
  })

  function handleLogin() {
    login(userEmail, userPassword)
  }

  function handleCreateAccount() {
    // BROKEN
    createAccount(userCreateName, userCreateEmail, userCreatePassword)
  }

  function handleNoteClick(note) {
    setCurrentNotesContents(note.content);
    setShowEditor(true);
    setCurrentNoteId(note.id)
  }

  return (
    <>
      {/* top bar displaying basic info */}
      <div className="flex flex-row gap-3 justify-between border-2 border-black">
        <div className="">{isUserLoggedIn ? `You are logged in as: ${user.record.name}` : "You are not logged in!"}</div>
        {!isUserLoggedIn && (
          <div className="grid grid-rows-4">
            <div className="font-bold text-xl">Login</div>
            <input type="email" className="input" placeholder="Enter your email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
            <input type="text" className="input" placeholder="Enter your password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
            <div className="btn" onClick={handleLogin}>Login</div>
          </div>
        )}
        {!isUserLoggedIn && (
          <div className="grid grid-rows-3">
            <div className="font-bold text-xl">Create Account</div>
            <input type="email" className="input" placeholder="Enter your name" value={userCreateName} onChange={(e) => setUserCreateName(e.target.value)} />
            <input type="email" className="input" placeholder="Enter your email" value={userCreateEmail} onChange={(e) => setUserCreateEmail(e.target.value)} />
            <input type="text" className="input" placeholder="Enter your password" value={userCreatePassword} onChange={(e) => setUserCreatePassword(e.target.value)} />
            <div className="btn" onClick={handleCreateAccount}>Create Account</div>
          </div>
        )}
        {isUserLoggedIn ? <div className="btn" onClick={logout}>Logout</div> : ""}
      </div>

      {/* is user is logged in */}
      {isUserLoggedIn && (
        <div className="">
          {showEditor && (
            <div className="container">
              <MDEditor
                value={currentNoteContents}
                onChange={setCurrentNotesContents}
              />
              {/* <MDEditor.Markdown source={currentNoteContents} style={{ whiteSpace: 'pre-wrap' }} /> */}
            </div>
          )}
          <div className="">
            <div className="flex flex-col justify-between">
              <div className="">
                {allNotesList?.length > 0 ? (
                  allNotesList.map((note) => (
                    <div key={note.id} className="flex flex-row gap-3">
                      <div className="text-lg">{note.name}</div>
                      <div className="btn btn-sm btn-info" onClick={() => handleNoteClick(note)}>Edit</div>
                      <div className="btn btn-sm btn-error" onClick={() => deleteNote(note.id)}>Delete</div>
                    </div>
                  ))
                ) : (
                  <div className="">No notes found</div>
                )}
              </div>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export { Home }
