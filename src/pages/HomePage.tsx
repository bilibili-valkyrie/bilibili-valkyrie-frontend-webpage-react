import {
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import MyCard from "../components/MyCard";
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
      <TopBar title="瓦尔基里" />
      <Typography>fkyou</Typography>
      <Grid container>
        <Grid item>
          <MyCard style={{ width: "100%", height: "100%" }}>
            <CardActionArea
              onClick={(event) => {
                event.preventDefault();
                history.push("/addSubscribe");
              }}
            >
              <CardContent>
                <Add
                  style={{
                    height: 64,
                    width: 64,
                    color: "rgba(0, 0, 0, 0.54)",
                  }}
                />
              </CardContent>
            </CardActionArea>
          </MyCard>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
