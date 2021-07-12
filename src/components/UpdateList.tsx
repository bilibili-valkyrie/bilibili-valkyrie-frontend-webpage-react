import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducer/reducerCombiner";
import Video from "./Video";

const UpdateList = () => {
  const videos = useSelector((state: RootState) => state.newVideo);
  return (
    <Grid container spacing={1}>
      {videos.map((video) => (
        <Grid item key={video.id}>
          <Video video={video} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UpdateList;
