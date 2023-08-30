import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { switchUser } from "../features/accountSlice";
import { useGetAllProductsQuery } from "../features/usersApi";
import styles from "./Settings.module.css";

function Settings() {
  const [show, setShow] = useState(false);
  const activeUser = JSON.parse(localStorage.getItem("account"));
  const [user, setUser] = useState(activeUser);
  const { isLoading, isError, data } = useGetAllProductsQuery();
  const dispatch = useDispatch();

  const handleSwitch = (user) => {
    dispatch(switchUser(user));
  };

  const filteredData = data?.filter((user) => user.id !== activeUser.id);
  return (
    <div className={styles.container}>
      {isLoading ? (
        <h3 className="loading">Loading...</h3>
      ) : isError ? (
        <h3 className="error">An error occured</h3>
      ) : (
        <>
          <button
            className={styles.btn}
            onClick={() => setShow((prev) => !prev)}
          >
            Switch User
          </button>

          <div className={styles.active}>
            <div>
              <button>
                <img src={user.avatar} alt={user.name} /> <p>{user.name}</p>
              </button>
            </div>
          </div>

          <div>
            {show ? (
              <ul>
                {filteredData?.map((user) => (
                  <li className={styles.name} key={user.id}>
                    <button
                      onClick={() => {
                        setUser(user);
                        setShow((prev) => !prev);
                        handleSwitch(user);
                      }}
                      className={styles.userBtn}
                    >
                      <div>
                        <img src={user.avatar} alt={user.name} />
                      </div>
                      {user.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : undefined}
          </div>
        </>
      )}
    </div>
  );
}

export default Settings;
