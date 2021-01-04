import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

//UI Components
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import { DateTimePicker } from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { voucherActions } from "../../actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  uploadRoot: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  img: {
    height: "100px",
    width: "100px",
  },
  gridList: {
    height: "60vh",
  },
}));

export default function VoucherAddModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  //Redux
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    code: "",
    value: 0,
    is_used: false,
    category_id: "",
  });

  const { code, value } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Datetime functions
  const [validFromDate, handleValidFromDateChange] = useState(new Date());
  const [validToDate, handleValidToDateChange] = useState(new Date());

  //Main functions
  const onSubmit = async () => {
    dispatch(
      voucherActions.add({
        ...formData,
        valid_from: validFromDate,
        valid_to: validToDate,
      })
    );
    handleClose();
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  return (
    <React.Fragment>
      <Hidden xsDown>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          disabled={props.disable}
        >
          Create
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton
          color="primary"
          aria-label="add-btn"
          component="span"
          onClick={handleOpen}
          disabled={props.disable}
        >
          <AddIcon />
        </IconButton>
      </Hidden>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Container maxWidth="sm" className={classes.container}>
              <Typography variant="h4" gutterBottom>
                Add new Voucher
              </Typography>
              <Grid container justify="center" spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Voucher code"
                    id="outlined-code"
                    variant="outlined"
                    name="code"
                    value={code}
                    onChange={(e) => onChange(e)}
                    onKeyPress={(e) => keyPressed(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} container justify="center">
                  <Grid item>
                    <DateTimePicker
                      autoOk
                      ampm={false}
                      disablePast
                      value={validFromDate}
                      onChange={handleValidFromDateChange}
                      label="Valid from"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} container justify="center">
                  <Grid item>
                    <DateTimePicker
                      autoOk
                      ampm={false}
                      disablePast
                      value={validToDate}
                      onChange={handleValidToDateChange}
                      label="Valid to"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Discount value"
                    id="outlined-value"
                    variant="outlined"
                    name="value"
                    value={value}
                    onChange={(e) => onChange(e)}
                    onKeyPress={(e) => keyPressed(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    fullWidth
                    // value={categories.items[0]}
                    onChange={(event, newValue) => {
                      setFormData({ ...formData, category_id: newValue.id });
                    }}
                    id="controllable-category"
                    options={categories.items}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>

              {/* Actions */}
              <Grid
                style={{ marginTop: "10px" }}
                container
                justify="center"
                spacing={5}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => onSubmit(e)}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleClose}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
