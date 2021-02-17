import React, { useEffect, useState } from "react";

//UI Components
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

//Components
import AdminLayout from "../components/Layout";
import CustomAlert from "../components/Alert";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { settingActions, themeActions } from "../actions";

const useStyles = makeStyles((theme) => ({
  marginY: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
}));

export default function Setting() {
  //UI Hook
  const classes = useStyles();

  //Redux Hook
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const settings = useSelector((state) => state.settings);

  const [setting, setSetting] = useState({
    limit: 0,
  });

  const handleTextChange = (e) => {
    setSetting({ ...setting, [e.target.name]: e.target.value });
  };
  const handleUpdate = () => {
    dispatch(settingActions.update(setting));
  };

  useEffect(() => {
    dispatch(settingActions.getAll());
  }, [dispatch]);

  useEffect(() => {
    setSetting({ ...setting, limit: settings.item.limit });
  }, [settings.item]);

  return (
    <AdminLayout>
      <React.Fragment>
        {/* Breadcrumb */}
        <Breadcrumbs className={classes.marginY} aria-label="breadcrumb">
          <Link className={classes.link} to="/">
            Dashboard
          </Link>
          <Typography color="textPrimary">Settings</Typography>
        </Breadcrumbs>

        {/* Success & Error handling */}
        {<CustomAlert loading={settings.loading} />}
        {settings.error && (
          <CustomAlert
            openError={true}
            messageError={settings.error}
          ></CustomAlert>
        )}
        {settings.success && <CustomAlert openSuccess={true}></CustomAlert>}

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="h6">Admin dark theme: </Typography>
          </Grid>
          <Grid item>
            <Switch
              checked={theme.dark}
              onChange={() =>
                dispatch(themeActions.changeDarkTheme(theme.dark))
              }
              name="Dark"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="h6">Limit of reccommend products: </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="limit-input"
              type="number"
              name="limit"
              variant="outlined"
              value={setting.limit}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    </AdminLayout>
  );
}
