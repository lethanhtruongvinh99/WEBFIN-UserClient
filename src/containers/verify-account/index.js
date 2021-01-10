import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import callServer from "../../utils/NetworkUtils";
import { Button } from "antd";
const Verify = (props) =>
{
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const token = history.location.search.split("?")[1];
  const handleBackToLogin = () =>
  {
    props.history.push("/login");
  };
  const verifyStart = async (data) =>
  {
    setIsLoading(true);
    const result = await callServer(
      process.env.REACT_APP_HOST_NAME + "/auth/verify",
      "post",
      data
    );
    //console.log(result);
    if (result.auth)
    {
      setIsLoading(false);
    }
  };
  useEffect(() =>
  {
    const data = { token: token };
    verifyStart(data);
  }, []);
  return (
    <div>
      {isLoading ? (
        <p>Verifying </p>
      ) : (
          <div>
            <p>Verified</p>
            <Button type="link" onClick={() => handleBackToLogin()}>
              Back to login
          </Button>
          </div>
        )}
      <h1>Verify Account</h1>
    </div>
  );
};
export default Verify;
