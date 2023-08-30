import React from "react";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../features/usersApi";
import styles from "./Connection.module.css";

function Connection() {
  const { data, isLoading, isError } = useGetAllProductsQuery();

  const activeUser = JSON.parse(localStorage.getItem("account"));
  const friends = data?.filter((fri) => fri.id !== activeUser.id);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <h3 className="loading">loading...</h3>
      ) : isError ? (
        <h3 className="error">An error occured</h3>
      ) : (
        <div className={styles["friend-list"]}>
          {friends?.map((fri) => (
            <Link key={fri.id} to={`/connections/${fri.id}`}>
              <div className={styles["friend-card"]}>
                <img src={fri.avatar} alt={fri.name} />
                <p>{fri.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Connection;
