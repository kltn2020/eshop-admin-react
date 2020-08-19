import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

//UI Components
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";

//Custom
import { history } from "../store";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomAlert(props) {
  const classes = useStyles();

  //*Handle Success
  const [openSuccess, setOpenSuccess] = React.useState(
    props.openSuccess || false
  );

  const [messageSuccess, setMessageSuccess] = React.useState("");

  useEffect(() => {
    if (openSuccess)
      switch (history.location.state) {
        case 200:
          setMessageSuccess("Load successful!");
          break;
        case 201:
          setMessageSuccess("Add successful!");
          break;
        case 202:
          setMessageSuccess("Update successful!");
          break;
        case 203:
          setMessageSuccess("Delete successful!");
          break;
        default:
          break;
      }
  }, [openSuccess]);

  //*Handle Error
  const [openError, setOpenError] = React.useState(props.openError || false);
  const messageError = props.messageError || "";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };

  //*Hanlde Authority
  const [openErrorAuthority, setOpenErrorAuthority] = React.useState(
    props.openErrorAuthority || false
  );

  return (
    <div className={classes.root}>
      {/* Success Snackbar */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="success"
        >
          {messageSuccess}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          {messageError}
        </Alert>
      </Snackbar>

      {/* Error Authority */}
      <Collapse in={openErrorAuthority}>
        <Alert severity="error" variant="filled">
          Your access is denied! No Authority
        </Alert>
      </Collapse>
    </div>
  );
}
