import React from "react";

//UI Components
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";

//Components
import AdminLayout from "../components/Layout";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../actions";

export default function Setting() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  return (
    <AdminLayout>
      <React.Fragment>
        <Typography variant="h6">Dark Theme</Typography>
        <Switch
          checked={theme.dark}
          onChange={() => dispatch(themeActions.changeDarkTheme(theme.dark))}
          name="Dark"
        />
      </React.Fragment>
    </AdminLayout>
  );
}
