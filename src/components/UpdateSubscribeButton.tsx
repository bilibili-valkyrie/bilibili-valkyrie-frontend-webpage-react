import { CircularProgress, IconButton } from "@material-ui/core";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import React from "react";
import useAxiosErrorHandler from "../hooks/useAxiosErrorHandler";
import subscibe from "../api/subscibe";
import useMySnackbar from "../hooks/useMySnackbar";
import { useAppDispatch } from "../hooks/useTypedRedux";
import { initNewVideos } from "../reducer/newVideoReducer";

const UpdateSubscribeButton = () => {
  const snackbar = useMySnackbar();
  const dispatch = useAppDispatch();
  const handleErr = useAxiosErrorHandler();
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setProgress(0);
      const { totalUpdates } = await subscibe.updateAllVideos((msg) => {
        snackbar.success(`${msg.name} 新增 ${msg.updates} 条视频`);
        setProgress(msg.progress * 100);
      });
      snackbar.success(`共更新 ${totalUpdates} 条视频`);
      setIsLoading(false);
      dispatch(initNewVideos())
        .unwrap()
        .catch((e) => {
          handleErr(e);
        });
    } catch (e) {
      handleErr(e);
    }
  };
  return (
    <div style={{ position: "relative" }}>
      <IconButton onClick={handleClick} color="inherit" disabled={isLoading}>
        <AutorenewIcon />
      </IconButton>
      {isLoading && (
        <CircularProgress
          variant="determinate"
          value={progress}
          color="inherit"
          size={24}
          style={{ position: "absolute", top: 12, left: 12 }}
        />
      )}
    </div>
  );
};
export default UpdateSubscribeButton;
