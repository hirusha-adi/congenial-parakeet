import { useEffect, useState } from "react";
import { user, isUserLoggedIn, login, logout, createAccount } from "../lib/pocketbase"

const Home = () => {

  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const [userCreateName, setUserCreateName] = useState("")
  const [userCreateEmail, setUserCreateEmail] = useState("")
  const [userCreatePassword, setUserCreatePassword] = useState("")

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

  return (
    <>
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
    </>
  );
};

export { Home }
