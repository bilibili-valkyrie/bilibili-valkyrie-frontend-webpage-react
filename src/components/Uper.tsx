import {
  Grid,
  CardContent,
  Typography,
  CardActionArea,
  Button,
  Card,
  ClickAwayListener,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import subscibe from "../api/subscibe";
import { UperAsJsonWhileGet } from "../api/types/UperAsJson";
import useAxiosErrorHandler from "../hooks/useAxiosErrorHandler";
import useMySnackbar from "../hooks/useMySnackbar";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import { addNewVideos, initNewVideos } from "../reducer/newVideoReducer";
import { RootState } from "../reducer/reducerCombiner";
import { initUpers } from "../reducer/uperReducer";
import MyCard from "./MyCard";

const CustomButton = ({
  children,
  onClick,
}: {
  children: JSX.Element | string;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
}) => {
  return (
    <Grid item>
      <Button variant="outlined" onClick={onClick} style={{ height: 32 }}>
        {children}
      </Button>
    </Grid>
  );
};

const UperInfo = ({
  uper,
  setOver,
}: {
  uper: UperAsJsonWhileGet;
  setOver: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Card style={{ minHeight: 100 }}>
      <CardActionArea
        onClick={() => {
          setOver(true);
        }}
        style={{ minHeight: 100 }}
      >
        <CardContent>
          <Grid container justify="center">
            <Typography variant="h5" align="center">
              {uper.card.name}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const UperAction = ({
  uper,
  setOver,
}: {
  uper: UperAsJsonWhileGet;
  setOver: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const handleErr = useAxiosErrorHandler();
  const snackbar = useMySnackbar();
  const handleReaded = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await subscibe.updateRead(uper.id);
    dispatch(initNewVideos())
      .unwrap()
      .catch((e) => {
        handleErr(e);
      });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await subscibe.del(uper.id);
    snackbar.info("删除成功");
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
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { updates } = await subscibe.updateVideos(uper.id);
    snackbar.success(`${uper.card.name} 新增 ${updates} 条视频`);
    dispatch(addNewVideos(uper.id))
      .unwrap()
      .catch((err) => {
        handleErr(err);
      });
  };

  const handleOpenSpace = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    window.open(`https://space.bilibili.com/${uper.mid}`);
  };
  return (
    <ClickAwayListener
      onClickAway={() => {
        setOver(false);
      }}
    >
      <Card raised style={{ minHeight: 100 }}>
        <CardContent style={{ padding: 4 }}>
          <Grid
            container
            justify="center"
            alignItems="center"
            spacing={1}
            style={{ minHeight: 100 }}
          >
            <CustomButton onClick={handleReaded}>已读</CustomButton>
            <CustomButton onClick={handleUpdate}>更新</CustomButton>
            <CustomButton onClick={handleOpenSpace}>空间</CustomButton>
            <CustomButton onClick={handleDelete}>取关</CustomButton>
          </Grid>
        </CardContent>
      </Card>
    </ClickAwayListener>
  );
};

const Uper = ({ uper }: { uper: UperAsJsonWhileGet }) => {
  const [over, setOver] = React.useState(false);
  return (
    <Grid item xs={12} md={4} lg={2}>
      {over ? (
        <UperAction uper={uper} setOver={setOver} />
      ) : (
        <UperInfo uper={uper} setOver={setOver} />
      )}
    </Grid>
  );
};

const Upers = () => {
  const history = useHistory();
  const upers = useAppSelector((state: RootState) => state.uper);
  return (
    <Grid container spacing={1}>
      {upers.map((uper) => (
        <Uper uper={uper} key={uper.id} />
      ))}
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
  );
};

export default Upers;
