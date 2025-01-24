import { useEffect } from "react";
import { user, isUserLoggedIn } from "../lib/pocketbase"

const Home = () => {

  useEffect(() => {
    document.title = `Home`
  })

  return (
    <>
      <div className="grid grid-cols-3 border-2">
        <div className=""></div>
      </div>
    </>
  );
};

export { Home }
