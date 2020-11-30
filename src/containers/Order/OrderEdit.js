//Standard Modules
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//UI Components
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

//Custom Components
import AdminLayout from "../../components/Layout";
import CustomAlert from "../../components/Alert";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../actions";

//Custom Functions
function dateFormat(date) {
  return new Intl.DateTimeFormat("en-GB", {
    // second: "numeric",
    minute: "numeric",
    hour: "numeric",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginY: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(2),
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  bottomAppbar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "white",
  },
  richEditor: {
    height: "50vh",
    border: "1px solid #ddd",
    backgroundColor: "white",
  },
  sectionBtn: {
    width: "100%",
    padding: theme.spacing(1),
    borderTop: `5px solid ${theme.palette.primary.main}`,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
  },
}));

//Options
const statusOption = [
  { title: "Processing", value: "processing" },
  { title: "Shipping", value: "shipping" },
  { title: "Completed", value: "completed" },
  { title: "Cancelled", value: "cancelled" },
];

export default function OrderEdit(props) {
  const classes = useStyles();

  //Redux Hooks
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  //>>Load order edit
  useEffect(() => {
    dispatch(orderActions.getById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  //Colapse
  const [openInfoCollapse, setOpenInfoCollapse] = useState(true);
  const handleInfoCollapse = () => {
    setOpenInfoCollapse(!openInfoCollapse);
  };

  const [openDetailCollapse, setOpenDetailCollapse] = useState(true);
  const handleDetailCollapse = () => {
    setOpenDetailCollapse(!openDetailCollapse);
  };

  //Main funtion
  const [formData, setFormData] = useState({
    status: "",
  });

  //>>Set formData = Order item
  useEffect(() => {
    setFormData({ ...orders.item });
  }, [orders.item]);

  const onSubmit = () => {
    dispatch(orderActions.update(props.match.params.id, formData));
  };

  return (
    <AdminLayout>
      <React.Fragment>
        {/* Breadcrumb */}
        <Breadcrumbs className={classes.marginY} aria-label="breadcrumb">
          <Link className={classes.link} to="/">
            Dashboard
          </Link>
          <Link className={classes.link} to="/orders">
            Order List
          </Link>
          <Typography color="textPrimary">
            Order Edit: <strong>#{props.match.params.id}</strong>
          </Typography>
        </Breadcrumbs>

        {/* Success & Error handling */}
        {<CustomAlert loading={orders.loading} />}
        {orders.error && (
          <CustomAlert
            openError={true}
            messageError={orders.error}
          ></CustomAlert>
        )}
        {orders.success && <CustomAlert openSuccess={true}></CustomAlert>}

        {/* Main */}
        {orders.item && orders.item.address && orders.item.user ? (
          <Grid container direction="row-reverse" spacing={3}>
            {/* Order info */}
            <Grid item xs={12} sm={12} md={4}>
              <ButtonBase
                className={classes.sectionBtn}
                onClick={handleInfoCollapse}
              >
                <Typography variant="h6"> Info</Typography>
                {openInfoCollapse ? <ExpandLess /> : <ExpandMore />}
              </ButtonBase>
              <Collapse in={openInfoCollapse} timeout="auto" unmountOnExit>
                <Paper className={classes.padding} elevation={4}>
                  <Grid container spacing={2} justify="center">
                    {/* order id */}
                    <Grid item xs={12} sm={12} md={9}>
                      <TextField
                        id="order-id-text"
                        fullWidth
                        label="Order ID"
                        disabled
                        value={orders.item.id || ""}
                      />
                    </Grid>
                    {/* create at */}
                    <Grid item xs={12} sm={12} md={9}>
                      <TextField
                        id="create-at-text"
                        fullWidth
                        label="Order At"
                        disabled
                        value={
                          (orders.item.order_date &&
                            dateFormat(orders.item.order_date)) ||
                          ""
                        }
                      />
                    </Grid>
                    {/* customer name */}
                    <Grid item xs={12} sm={12} md={9}>
                      <TextField
                        id="customer-name-text"
                        fullWidth
                        label="Customer Name"
                        disabled
                        value={orders.item.user.email || "Guest"}
                      />
                    </Grid>
                    {/* customer name */}
                    <Grid item xs={12} sm={12} md={9}>
                      <TextField
                        id="customer-phone-text"
                        fullWidth
                        label="Customer Phone"
                        disabled
                        value={orders.item.address.phone_number || ""}
                      />
                    </Grid>
                    {/* customer detail addess */}
                    <Grid item xs={12} sm={12} md={9}>
                      <TextField
                        id="customer-address-text"
                        fullWidth
                        label="Customer Address"
                        disabled
                        value={
                          (orders.item.address && orders.item.address.locate) ||
                          ""
                        }
                      />
                    </Grid>

                    {/* Status */}
                    <Grid item xs={12} sm={12} md={9}>
                      <Autocomplete
                        id="combo-box-status"
                        fullWidth
                        value={
                          statusOption.find(
                            (element) => element.value === formData.status
                          ) || null
                        }
                        onChange={(e, newValue) =>
                          newValue &&
                          setFormData({ ...formData, status: newValue.value })
                        }
                        options={statusOption}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Status"
                            variant="outlined"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Collapse>
            </Grid>

            {/* Order detail*/}
            <Grid item xs={12} sm={12} md={8}>
              <ButtonBase
                className={classes.sectionBtn}
                onClick={handleDetailCollapse}
              >
                <Typography variant="h6">Detail</Typography>
                {openDetailCollapse ? <ExpandLess /> : <ExpandMore />}
              </ButtonBase>
              <Collapse in={openDetailCollapse} timeout="auto" unmountOnExit>
                <Paper className={classes.padding} elevation={4}>
                  {orders.item && orders.item.voucher && (
                    <Typography variant="h6">
                      Voucher: {orders.item.voucher.code || ""}
                    </Typography>
                  )}

                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      {!orders.loading ? (
                        <TableBody>
                          {orders.item.lines &&
                            orders.item.lines.map((row, index) => (
                              <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                  <img
                                    width={48}
                                    src={
                                      row.product.images &&
                                      row.product.images.length > 0 &&
                                      row.product.images[0].url
                                    }
                                    alt="No data"
                                  ></img>
                                </TableCell>
                                <TableCell>
                                  {row.product.name}
                                  {
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                    >
                                      sku: {row.product.sku || ""}
                                    </Typography>
                                  }
                                </TableCell>
                                {row.discount > 0 ? (
                                  <TableCell align="right">
                                    {(
                                      row.price - row.discount
                                    ).toLocaleString() || 0}
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      style={{ textDecoration: "line-through" }}
                                    >
                                      {row.price && row.price.toLocaleString()}
                                    </Typography>
                                  </TableCell>
                                ) : (
                                  <TableCell align="right">
                                    {(row.price &&
                                      row.price.toLocaleString()) ||
                                      0}
                                  </TableCell>
                                )}

                                <TableCell align="right">
                                  {row.quantity}
                                </TableCell>
                                <TableCell align="right">
                                  {row.total.toLocaleString() || 0}
                                </TableCell>
                              </TableRow>
                            ))}

                          {/* Row extend */}
                          <TableRow>
                            <TableCell rowSpan={3} colSpan={2} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">
                              {orders.item.discount &&
                                orders.item.total &&
                                (
                                  orders.item.total + orders.item.discount
                                ).toLocaleString()}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={2}>Discount total</TableCell>
                            <TableCell align="right">
                              {(orders.item.discount &&
                                orders.item.discount.toLocaleString()) ||
                                0}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">
                              {(orders.item.total &&
                                orders.item.total.toLocaleString()) ||
                                0}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      ) : null}
                    </Table>
                  </TableContainer>
                </Paper>
              </Collapse>
            </Grid>
          </Grid>
        ) : null}
        {/* White space for bottom appbar */}
        <div style={{ height: "128px" }} />

        {/* Bottom Appbar for buttons */}
        <AppBar position="fixed" className={classes.bottomAppbar}>
          <Toolbar>
            <Grid container justify="center" spacing={5}>
              <Grid item>
                <Button
                  component={Link}
                  to="/orders"
                  variant="contained"
                  color="default"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </AdminLayout>
  );
}
