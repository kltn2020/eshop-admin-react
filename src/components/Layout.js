//Standard Modules
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

//UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Skeleton from "@material-ui/lab/Skeleton";

//Components
import CustomDrawer from "../components/CustomDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(2),
  },

  fixedHeight: {
    height: 300,
  },
  seeMore: {
    marginTop: theme.spacing(3),
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
  },
  depositContext: {
    flex: 1,
  },
  linearLoading: {
    color: theme.palette.primary.main,
    height: 10,
  },
}));

export default function AdminLayout({ children }) {
  //UI Hooks
  const classes = useStyles();

  return (
    <React.Fragment>
      {true ? (
        <React.Fragment>
          <div className={classes.root}>
            <CustomDrawer onToggleTheme={false} />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />

              <Container maxWidth="xl" className={classes.container}>
                {children}
              </Container>
            </main>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Skeleton height={64}></Skeleton>
          <LinearProgress className={classes.linearLoading} />

          <Grid container direction="row" alignItems="flex-start" spacing={2}>
            <Grid item xs={12} sm={2}>
              <Skeleton height={"80vh"}></Skeleton>
            </Grid>
            <Grid item sm={10}>
              <Skeleton height={"80vh"}></Skeleton>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
