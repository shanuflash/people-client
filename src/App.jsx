import { useContext } from "react";
import "./App.css";
import { Navigate, Link } from "react-router-dom";
import { DataContext } from "./context/DataProvider";

/* ---------------------
>TODO:
- responsive 
- login/signup switcher
----------------------- */

function App() {
  const { User, Data, handleLogout } = useContext(DataContext);
  return (
    <>
      {User ? (
        <div className="data">
          <div className="data-container">
            <div className="head">
              <div className="head-left h">
                Welcome Back!
                <div className="head-desc">
                  Select a profile to see its details.
                </div>
              </div>
              <div className="head-right" onClick={handleLogout}>
                Logout
              </div>
            </div>
            {Data?.map((item) => (
              <Link
                to={`/user/${item.id}`}
                className="item-container"
                id={item.id}
              >
                <img src={item.avatar} alt="" className="item-img" />
                <div className="item-data">
                  <div className="item-name">
                    {item.first_name} {item.last_name}
                  </div>
                  <div className="item-email">{item.email}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Navigate replace to="/Login" />
      )}
    </>
  );
}

export default App;
