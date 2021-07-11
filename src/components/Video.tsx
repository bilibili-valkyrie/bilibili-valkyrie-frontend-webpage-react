import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/LinkRounded";
import PlayCircleOutlineRoundedIcon from "@material-ui/icons/PlayCircleOutlineRounded";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import VideoAsJson from "../api/types/VideoAsJson";

const InfoItem = ({
  icon,
  content,
}: {
  icon: JSX.Element;
  content: string | number;
}) => {
  return (
    <Grid item>
      <Typography
        gutterBottom
        variant="body2"
        color="textSecondary"
        component="p"
        style={{ display: "flex", alignItems: "center" }}
      >
        {icon}
        {content}
      </Typography>
    </Grid>
  );
};

const Video = ({ video }: { video: VideoAsJson }) => {
  const handleClick = () => {
    setTimeout(() => {
      window.open(`http://www.bilibili.com/video/${video.bvid}`);
    }, 200);
  };
  return (
    <>
      <Card>
        <CardActionArea onClick={handleClick} style={{ height: "100%" }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              {video.title}
            </Typography>
            <Grid container spacing={1} direction="row" justify="center">
              <InfoItem
                content={video.play}
                icon={<PlayCircleOutlineRoundedIcon fontSize="small" />}
              />
              <InfoItem
                content={video.comment}
                icon={<ListRoundedIcon fontSize="small" />}
              />
              <InfoItem
                content={video.review}
                icon={<ChatBubbleOutlineRoundedIcon fontSize="small" />}
              />
              <InfoItem
                content={video.bvid}
                icon={<LinkIcon fontSize="small" />}
              />
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
export default Video;
