import { useContext, useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const { handleLogout } = useContext(AuthContext);
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
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
              <img src={item.image} alt="" className="item-img" />
              <div className="item-data">
                <div className="item-name">
                  {item.firstName} {item.lastName}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
