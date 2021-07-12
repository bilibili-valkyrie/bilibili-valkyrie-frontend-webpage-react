import {
  Button,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { ArrowBack, ArrowForwardIos } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import biliapi from "../api/biliapi";
import subscibe from "../api/subscibe";
import MyCard from "../components/MyCard";
import TopBar from "../components/TopBar";
import useAxiosErrorHandler from "../hooks/useAxiosErrorHandler";
import useMySnackbar from "../hooks/useMySnackbar";

const AddSubscribePage = () => {
  const [mid, setMid] = React.useState("");
  const [uperInfo, setUperInfo] = React.useState<Record<string, any>>();
  const handleErr = useAxiosErrorHandler();
  const history = useHistory();
  const snackbar = useMySnackbar();
  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const { data } = await biliapi.getUperInfo(mid);
      const uperInfoRes = {
        mid: data.card.mid,
        name: data.card.name,
        follower: data.follower,
        sign: data.card.sign,
        archiveCount: data.archive_count,
      };
      setUperInfo(uperInfoRes);
    } catch (e) {
      handleErr(e);
    }
  };
  return (
    <>
      <TopBar title="新增订阅" />
      <Container maxWidth="xs">
        <MyCard>
          <CardContent>
            <IconButton
              style={{ position: "absolute" }}
              onClick={(event) => {
                event.preventDefault();
                history.push("/");
              }}
            >
              <ArrowBack />
            </IconButton>
            <Grid container justify="center">
              <Grid item>
                <Typography variant="h4" align="center" gutterBottom>
                  新增订阅
                </Typography>
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="up 主 UID"
                  value={mid}
                  onChange={(event) => {
                    setUperInfo(undefined);
                    setMid(event.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={handleClick}>
                          <ArrowForwardIos />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {uperInfo && (
                <>
                  <Grid item style={{ width: "100%" }}>
                    <Typography gutterBottom>请确认以下信息：</Typography>
                    <CardActionArea>
                      <Typography component="div">
                        <table style={{ width: "100%" }}>
                          <tbody>
                            <tr>
                              <td>UID：</td>
                              <td>{uperInfo.mid}</td>
                            </tr>
                            <tr>
                              <td>昵称：</td>
                              <td>{uperInfo.name}</td>
                            </tr>
                            <tr>
                              <td>关注：</td>
                              <td>{uperInfo.follower}</td>
                            </tr>
                            <tr>
                              <td>签名：</td>
                              <td>{uperInfo.sign}</td>
                            </tr>
                            <tr>
                              <td>视频数：</td>
                              <td>{uperInfo.archiveCount}</td>
                            </tr>
                          </tbody>
                        </table>
                      </Typography>
                    </CardActionArea>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={async (event) => {
                        event.preventDefault();
                        try {
                          await subscibe.add(mid);
                          snackbar.success("关注成功！");
                        } catch (e) {
                          handleErr(e);
                        }
                      }}
                    >
                      提交
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </CardContent>
        </MyCard>
      </Container>
    </>
  );
};

export default AddSubscribePage;
