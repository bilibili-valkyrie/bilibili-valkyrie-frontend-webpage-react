import { Grid } from "@material-ui/core";
import React from "react";
import subscibe from "../api/subscibe";
import VideoAsJson from "../api/types/VideoAsJson";
import request from "../controller/request";
import Video from "./Video";

const UpdateList = () => {
  const [videos, setVideos] = React.useState<VideoAsJson[]>([]);
  React.useEffect(() => {
    const token = localStorage.getItem("userToken");
    request.setToken(token!);
    subscibe.getAllUpdates().then((videoAry) => {
      setVideos(videoAry);
    });
  }, []);
  return (
    <Grid container>
      {videos.map((video) => (
        <Grid item key={video.id}>
          <Video video={video} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UpdateList;
