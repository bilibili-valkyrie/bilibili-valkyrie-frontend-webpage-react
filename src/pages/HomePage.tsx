import { Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import TopBar from "../components/TopBar";
import request from "../controller/request";

const HomePage = (): JSX.Element => {
  const history = useHistory();
  React.useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token === null) {
      history.push("/login");
    } else {
      request.setToken(token);
    }
  }, [history]);
  return (
    <>
      <TopBar />
      <Typography>fkyou</Typography>
    </>
  );
};

export default HomePage;
