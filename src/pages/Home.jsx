import { useEffect, useState } from "react";
import { user, isUserLoggedIn } from "../lib/pocketbase"

const Home = () => {

  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  useEffect(() => {
    document.title = `Home`
  })

  return (
    <>
      <div className="grid grid-cols-3 border-2 border-black">
        <div className="">{isUserLoggedIn ? "true" : "You are not logged in!"}</div>
        <div className="">
          {isUserLoggedIn ? "loggedin" : (
            <>
              <input type="text" placeholder="Enter your email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
              <input type="text" placeholder="Enter your password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export { Home }
