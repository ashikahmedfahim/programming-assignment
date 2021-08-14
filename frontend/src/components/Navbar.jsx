import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userLogin);
  const { loginUserLoading, user, error1 } = userData;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Social Site
            </Link>
          </Typography>

          {user ? (
            <Button color="inherit">
              <a href="/" className={classes.link}>
                Logout
              </a>
            </Button>
          ) : (
            <>
              <Button color="inherit">
                <Link to="/login" className={classes.link}>
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/register" className={classes.link}>
                  Register
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
