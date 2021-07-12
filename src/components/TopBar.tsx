import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, AccountCircleOutlined } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import loginout from "../api/loginout";
import request from "../controller/request";
import useAxiosErrorHandler from "../hooks/useAxiosErrorHandler";
import { RootState } from "../reducer/reducerCombiner";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    section: {
      display: "flex",
    },
  })
);

const NotificationButton = () => {
  const newVideos = useSelector((state: RootState) => state.newVideo);
  return (
    <IconButton aria-label={`${newVideos.length} 个新视频`} color="inherit">
      <Badge badgeContent={newVideos.length} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

const MenuItems = React.forwardRef(
  (
    props: {
      handleMenuClose: VoidFunction;
      token: string | null;
      setToken: React.Dispatch<React.SetStateAction<string | null>>;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ) => {
    const history = useHistory();
    const handleErr = useAxiosErrorHandler();
    React.useEffect(() => {
      props.setToken(localStorage.getItem("userToken"));
    }, [props]);
    if (props.token === null)
      return (
        <MenuItem
          onClick={() => {
            history.push("/login");
          }}
        >
          登录/注册
        </MenuItem>
      );
    request.setToken(props.token);
    const handleExitClick = (event: React.MouseEvent) => {
      event.preventDefault();
      localStorage.removeItem("userToken");
      props.setToken(null);
      try {
        loginout.logout();
      } catch (e) {
        handleErr(e);
      }
      request.clearToken();
      history.push("/login");
      props.handleMenuClose();
    };
    return <MenuItem onClick={handleExitClick}>退&emsp;出</MenuItem>;
  }
);

const TopBar = ({ title }: { title: string }): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [token, setToken] = React.useState<string | null>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItems
        handleMenuClose={handleMenuClose}
        token={token}
        setToken={setToken}
      />
    </Menu>
  );

  return (
    <div className={classes.grow} style={{ marginBottom: 72 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.section}>
            {request.token && <NotificationButton />}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {token === null ? <AccountCircleOutlined /> : <AccountCircle />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default TopBar;
