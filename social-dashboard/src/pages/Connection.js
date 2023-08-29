import React from "react";
import { useGetAllProductsQuery } from "../features/usersApi";

function Connection() {
  const { data, isLoading, isError } = useGetAllProductsQuery();

  const activeUser = JSON.parse(localStorage.getItem("account"));
  const friends = data?.filter((fri) => fri.id !== activeUser.id);

  return (
    <div>
      {isLoading ? (
        <h3>loading...</h3>
      ) : isError ? (
        <h3>An error occured</h3>
      ) : (
        <ul>
          {friends?.map((fri) => (
            <li key={fri.id}>{fri.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Connection;
