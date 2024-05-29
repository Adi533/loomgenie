import {useState, useEffect, useRef} from "react";
import "./admin.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus, faSearch} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminLogin from "../signin/AdminLogin";
const AdminPanel = () => {
  const [count, setCount] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    async function getData() {
      await axios
        .get("http://localhost:8000/api/users")
        .then((e) => setUsers(e.data));
    }

    getData();
  }, []);

  const increment = () => {
    setCount(count + 5);
  };

  const decrement = () => {
    if (count >= 5) {
      setCount(count - 5);
    }
  };

  const handleSearch = () => {
    console.log("Searching for User ID:", searchId);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const handleLogout = () => {

        dispatch(logout());
        navigate('/');
    
      };
  return (
    <>
    {!currentUser ? (
      <AdminLogin />
    ) : (
      <div className="admin">
        <button id='logout' type="submit" className='btn' onClick={handleLogout}>Logout</button>
      <img src="./src/assets/logi.png" className="imag" />
      <h1>Admin Panel</h1>
      <div className="admin-panel">
        <div className="side-bar">
          <div className="top">
            <h5>USER DETAILS</h5>
            <div className="ser">
              <input
                type="text"
                placeholder="Search ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="search-icon"
                onClick={handleSearch}
              />
            </div>
          </div>
          <div>
            {users.length !== 0
              ? users.map((e) => {
                  if (
                    searchId == e._id ||
                    searchId == "" ||
                    searchId == e.username
                  ) {
                    return (
                      <div key={e._id} className="details">
                        <div className="ima">
                          <img src="./src/assets/logi.png" alt="" />
                        </div>
                        <div className="cont">
                          <p>
                            {e.username}
                          </p>
                        </div>

                        <div className="btn4 ">
                          <button
                            onClick={async () => {
                              if (
                                window.confirm(
                                  "Do you really want to remove this user ?"
                                )
                                // ..
                              ) {
                                await axios
                                  .post("http://localhost:8000/api/remove", {
                                    "username": e.username,
                                  })
                                  .then(window.location.reload());
                              }
                            }}
                            type="submit"
                          >
                            REMOVE{" "}
                          </button>
                        </div>
                        <div className="btn4 plan">
                          <div>
                            {" "}
                            <button
                              onClick={async () => {
                                const plan = window.prompt(
                                  "Type plan to be changed : Gold / Silver / Platinum / NoPlan ",
                                  e.plandetails
                                );

                                console.log(plan);
                                if (plan !== "") {
                                  if (
                                    plan === "Platinum" ||
                                    plan === "Gold" ||
                                    plan === "Silver" ||
                                    plan === "NoPlan"
                                  ) {
                                    await axios
                                      .post("http://localhost:8000/api/plan", {
                                        "username": e.username,
                                        "plan": plan,
                                      })
                                      .then(window.location.reload());
                                  } else {
                                    window.alert("Enter correct plan");
                                  }
                                } else {
                                  window.alert("select plan first");
                                }
                              }}
                            >
                              Change Plan
                            </button>
                          </div>
                        </div>
                        <div className="btn4">
                          <button type="submit">
                            {e.plandetails}{" "}
                          </button>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })
              : null}
          </div>
        </div>

        <div className="stats">
          <div className="head">
            <h2>Satistics</h2>
            <div className="statistics">
              <div className="spent">
                <p>{users.length}</p>
                <span>USERS</span>
              </div>
            </div>
          </div>

          <div className="recent-check">
            <h4>CUSTOMIZE YOUR PLAN</h4>
            <div className="details">
              <div className="cont">
                <p>GOLD</p>
              </div>
              <div className="edit">
                <p>Add</p>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="icon"
                  onClick={increment}
                  style={{cursor: "pointer"}}
                />
                <input type="text" value={count} readOnly />
                <FontAwesomeIcon
                  icon={faMinus}
                  className="icon"
                  onClick={decrement}
                  style={{cursor: "pointer"}}
                />

                <p>Users</p>
              </div>

              <div className="btn4">
                <button
                  onClick={async () => {
                    await axios
                      .post("http://localhost:8000/api/limit", {
                        "plan": "Gold",
                        "limit": count,
                      })
                      .then(window.location.reload());
                  }}
                  type="submit"
                >
                  SAVE{" "}
                </button>
              </div>
            </div>
            <div className="details">
              <div className="cont">
                <p>SILVER</p>
              </div>
              <div className="edit">
                <p>Add</p>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="icon"
                  onClick={increment}
                  style={{cursor: "pointer"}}
                />
                <input type="text" value={count} readOnly />
                <FontAwesomeIcon
                  icon={faMinus}
                  className="icon"
                  onClick={decrement}
                  style={{cursor: "pointer"}}
                />

                <p>Users</p>
              </div>

              <div className="btn4">
                <button
                  type="submit"
                  onClick={async () => {
                    await axios
                      .post("http://localhost:8000/api/limit", {
                        "plan": "Silver",
                        "limit": count,
                      })
                      .then(window.location.reload());
                  }}
                >
                  SAVE{" "}
                </button>
              </div>
            </div>
            <div className="details">
              <div className="cont">
                <p>PLATINUM</p>
              </div>
              <div className="edit">
                <p>Add</p>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="icon"
                  onClick={increment}
                  style={{cursor: "pointer"}}
                />
                <input type="text" value={count} readOnly />
                <FontAwesomeIcon
                  icon={faMinus}
                  className="icon"
                  onClick={decrement}
                  style={{cursor: "pointer"}}
                />

                <p>Users</p>
              </div>

              <div className="btn4">
                <button
                  type="submit"
                  onClick={async () => {
                    await axios
                      .post("http://localhost:8000/api/limit", {
                        "plan": "Platinum",
                        "limit": count,
                      })
                      .then(window.location.reload());
                  }}
                >
                  SAVE{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    )}
  </>
  );
};
export default AdminPanel;