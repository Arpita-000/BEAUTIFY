import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <p>Home</p>
      {
        <div>
          <p>{user?.displayName}</p>
          <p>{user?.email}</p>
        </div>
      }
    </div>
  );
};

export default Home;
