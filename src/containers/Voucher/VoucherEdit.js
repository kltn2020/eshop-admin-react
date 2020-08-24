import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

//UI Components
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
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
}));

const activeOptions = [
  { name: "Active", value: true },
  { name: "Unactive", value: false },
];

export default function VoucherEditModal(props) {
  const classes = useStyles();

  //Redux
  const dispatch = useDispatch();
  const vouchers = useSelector((state) => state.vouchers);
  const categories = useSelector((state) => state.categories);

  //Modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    dispatch(voucherActions.getById(props.id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Main function
  const [formData, setFormData] = useState({
    code: "",
    value: 0,
    valid_from: new Date(),
    valid_to: new Date(),
    category_id: 1,
  });

  //>>Set formData = voucher item
  useEffect(() => {
    vouchers.item && setFormData({ ...vouchers.item });
  }, [vouchers.item]);

  const onSubmit = async () => {
    dispatch(voucherActions.update(props.id, formData));
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Edit" aria-label="edit">
        <IconButton
          aria-label="add-btn"
          component="span"
          onClick={handleOpen}
          disabled={props.disable}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
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
                Update Voucher
              </Typography>
              <Grid container justify="center" spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Voucher code"
                    id="outlined-code"
                    variant="outlined"
                    name="code"
                    value={formData.code}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6} container justify="center">
                  <Grid item>
                    <DateTimePicker
                      ampm={false}
                      value={formData.valid_from}
                      disabled
                      label="Valid from"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} container justify="center">
                  <Grid item>
                    <DateTimePicker
                      ampm={false}
                      value={formData.valid_to}
                      disabled
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
                    value={formData.value}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    fullWidth
                    disabled
                    value={
                      categories.items.find(
                        (element) => element.id === formData.category_id
                      ) || categories.items[0]
                    }
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
                <Grid item xs={12}>
                  <Autocomplete
                    fullWidth
                    value={
                      formData.is_used ? activeOptions[0] : activeOptions[1]
                    }
                    onChange={(e, newValue) =>
                      setFormData({ ...formData, is_used: newValue.value })
                    }
                    id="controllable-category"
                    options={activeOptions}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Active"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>

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
                    Update
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
    </div>
  );
}
