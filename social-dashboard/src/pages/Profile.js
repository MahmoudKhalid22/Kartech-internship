import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const data = useSelector((state) => state.account);

  console.log(data);

  return (
    <div>
      <div>
        <div>
          <div>{/* <img /> */}</div>
          <div>
            <img src={data.user.avatar} alt={data.user.name} />
          </div>
        </div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
}

export default Profile;
