import {
  Grid,
  CardContent,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import subscibe from "../api/subscibe";
import { UperAsJsonWhileGet } from "../api/types/UperAsJson";
import useAxiosErrorHandler from "../hooks/useAxiosErrorHandler";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedRedux";
import { initNewVideos } from "../reducer/newVideoReducer";
import { RootState } from "../reducer/reducerCombiner";
import MyCard from "./MyCard";

const Uper = ({ uper }: { uper: UperAsJsonWhileGet }) => {
  const dispatch = useAppDispatch();
  const handleErr = useAxiosErrorHandler();
  const handleClick = async (
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
  return (
    <Grid item>
      <MyCard>
        <CardActionArea onClick={handleClick}>
          <CardContent>
            <Typography variant="h4">{uper.card.name}</Typography>
          </CardContent>
        </CardActionArea>
      </MyCard>
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
