import React from "react";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../features/usersApi";
import { useSelector } from "react-redux";
import styles from "./Connection.module.css";

function Connection() {
  const { data, isLoading, isError } = useGetAllProductsQuery();
  console.log(data);
  const activeUser = useSelector((state) => state.account);
  const friends = data?.users?.filter((fri) => fri.id !== activeUser.user.id);

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
