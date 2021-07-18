import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import TopBar from "../components/TopBar";
import UpdateList from "../components/UpdateList";
import Upers from "../components/Uper";
import request from "../controller/request";
import useAxiosErrorHandler from "../hooks/useAxiosErrorHandler";
import { useAppDispatch } from "../hooks/useTypedRedux";
import { initNewVideos } from "../reducer/newVideoReducer";
import { initUpers } from "../reducer/uperReducer";

const HomePage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const handleErr = useAxiosErrorHandler();

  React.useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token === null) {
      history.push("/login");
    } else {
      request.setToken(token);
      dispatch(initNewVideos())
        .unwrap()
        .catch((e) => {
          handleErr(e);
        });
      dispatch(initUpers())
        .unwrap()
        .catch((e) => {
          handleErr(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <TopBar title="瓦尔基里" />
      <Typography gutterBottom>
        页面右上角刷新键可获取全部更新
        <br />
        点击up主卡片进行单独操作
      </Typography>
      <Grid container spacing={1}>
        <Upers />
        <UpdateList />
      </Grid>
    </>
  );
};

export default HomePage;
