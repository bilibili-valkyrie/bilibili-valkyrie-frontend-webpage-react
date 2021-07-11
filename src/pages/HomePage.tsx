import {
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import subscibe from "../api/subscibe";
import { UperAsJsonWhileGet } from "../api/types/UperAsJson";
import MyCard from "../components/MyCard";
import TopBar from "../components/TopBar";
import UpdateList from "../components/UpdateList";
import request from "../controller/request";
import useAxiosErrorHandler from "../hooks/useAxiosErrorHandler";

const HomePage = (): JSX.Element => {
  const history = useHistory();
  const { handleErr } = useAxiosErrorHandler();
  const [upers, setUpers] = React.useState<UperAsJsonWhileGet[]>();

  try {
    React.useEffect(() => {
      const token = localStorage.getItem("userToken");
      if (token === null) {
        history.push("/login");
      } else {
        request.setToken(token);
      }
      subscibe
        .getAll()
        .then((getedUpers) => {
          setUpers(getedUpers);
        })
        .catch((e) => {
          throw e;
        });
    }, [history]);
  } catch (e) {
    handleErr(e);
  }

  return (
    <>
      <TopBar title="瓦尔基里" />
      <Typography>fkyou</Typography>
      <Grid container spacing={1}>
        {upers &&
          upers.map((uper) => {
            return (
              <Grid item key={uper.id}>
                <MyCard>
                  <CardContent>
                    <Typography variant="h4">{uper.card.name}</Typography>
                  </CardContent>
                </MyCard>
              </Grid>
            );
          })}
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
        <UpdateList />
      </Grid>
    </>
  );
};

export default HomePage;
