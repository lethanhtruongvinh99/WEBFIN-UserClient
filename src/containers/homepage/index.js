import { Button } from "antd";
import { React, useEffect } from "react";

const Homepage = (props) => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      props.history.push("/login");
    }
  }, []);
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    props.history.push("/login");
  };
  return (
    <div>
      <h1>Welcome</h1>
      <Button type="danger" onClick={() => handleLogoutClick()}>
        Log out
      </Button>
    </div>
  );
};
export default Homepage;
