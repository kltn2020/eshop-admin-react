import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//UI Components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import ButtonBase from "@material-ui/core/ButtonBase";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

//Components
import { history } from "../store";
import AdminLayout from "../components/Layout";
//>>Charts
import OrdersChart from "../components/Charts/OrdersChart";
import UsersChart from "../components/Charts/UsersChart";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { orderActions, productActions, voucherActions } from "../actions";

const useStyles = makeStyles((theme) => ({
  sectionBtn: {
    width: "100%",
    padding: theme.spacing(1),
    borderTop: `5px solid ${theme.palette.primary.main}`,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
  },
  padding: {
    padding: theme.spacing(2),
  },
  statictisPaper: {
    "& .MuiAlert-message": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& .MuiButton-root, & .MuiTypography-h4": {
        fontWeight: 700,
      },
    },
  },
  tableContainer: {
    marginTop: "10px",
    maxHeight: "300px",
    overflow: "auto",
  },
  status: {
    color: "white",
    borderRadius: "10px",
    padding: theme.spacing(1),
  },
  processing: {
    backgroundColor: theme.palette.warning.main,
  },
  shipping: {
    backgroundColor: theme.palette.info.main,
  },
  completed: {
    backgroundColor: theme.palette.success.main,
  },
  cancelled: {
    backgroundColor: theme.palette.error.main,
  },
  total: {
    color: theme.palette.success.main,
  },
  discountTotal: {
    color: theme.palette.error.main,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const dateOption = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  //Redux
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const products = useSelector((state) => state.products);
  const vouchers = useSelector((state) => state.vouchers);

  //Open login success snackbar
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (history.location.state === 200) setOpen(true);
    dispatch(orderActions.getAll());
    dispatch(productActions.getAll());
    dispatch(voucherActions.getAll());
  }, [dispatch]);
  useEffect(() => {
    if (orders.items && orders.items.length > 0) {
      //Functions get past 7 days
      const dates = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        d.setUTCHours(0, 0, 0, 0);
        return d;
      });

      //Funtion to get date outside order and format it
      const pyDates = [...orders.items].map((order, index) => {
        const d = new Date(order.order_date);
        d.setUTCHours(0, 0, 0, 0);

        return { date: d, order: order };
      });

      //Function to compare and count
      //1.Create new array
      //2.Map past 7 days, if order day = 1 day in this array, count +1
      //3.Push data of day to newArray
      //4.When run through 7 days complete, setOrderData for chart with newArray
      let newArray = [];
      dates.map((day) => {
        let orderInDay = [];
        pyDates.map((orderDay) => {
          if (orderDay.date.getTime() === day.getTime()) {
            return orderInDay.push(orderDay.order);
          } else return orderInDay;
        });
        return newArray.push({
          day: day.toLocaleDateString("en-GB", dateOption),
          orderInDay: orderInDay,
        });
      });
      setOrderData(newArray.reverse());
    }
  }, [orders.items]);

  console.log(orderData);

  //Colapse
  const [openStatisticCollapse, setOpenStatisticCollapse] = useState(true);
  const handleStatisticCollapse = () => {
    setOpenStatisticCollapse(!openStatisticCollapse);
  };

  const [openOrderChartCollapse, setOpenOrderChartCollapse] = useState(true);
  const handleOrderChartCollapse = () => {
    setOpenOrderChartCollapse(!openOrderChartCollapse);
  };

  const [openUserChartCollapse, setOpenUserChartCollapse] = useState(true);
  const handleUserChartCollapse = () => {
    setOpenUserChartCollapse(!openUserChartCollapse);
  };

  const [openLastestOrderCollapse, setOpenLastestOrderCollapse] = useState(
    true
  );
  const handleLastestOrderCollapse = () => {
    setOpenLastestOrderCollapse(!openLastestOrderCollapse);
  };

  const [openTotalCollapse, setOpenTotalCollapse] = useState(true);
  const handleTotalCollapse = () => {
    setOpenTotalCollapse(!openTotalCollapse);
  };

  return (
    <React.Fragment>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Login successful!
        </Alert>
      </Snackbar>
      <AdminLayout>
        <React.Fragment>
          <Grid container direction="column" spacing={3}>
            {/* Statistic info */}
            <Grid item>
              <ButtonBase
                className={classes.sectionBtn}
                onClick={handleStatisticCollapse}
              >
                <Typography variant="h6">Statistics</Typography>
                {openStatisticCollapse ? <ExpandLess /> : <ExpandMore />}
              </ButtonBase>

              <Collapse in={openStatisticCollapse} timeout="auto" unmountOnExit>
                <Paper className={classes.padding} elevation={4}>
                  <Grid container spacing={3}>
                    {/* New orders */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Alert
                        icon={false}
                        variant="filled"
                        severity="info"
                        className={classes.statictisPaper}
                      >
                        <Typography variant="h4">
                          {orders.totalItems || 0}
                        </Typography>
                        <Typography variant="h6">Orders</Typography>
                        <Button component={Link} to="/orders">
                          More info {">"}
                        </Button>
                      </Alert>
                    </Grid>
                    {/* Products */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Alert
                        icon={false}
                        variant="filled"
                        severity="warning"
                        className={classes.statictisPaper}
                      >
                        <Typography variant="h4">
                          {products.totalItems || 0}
                        </Typography>
                        <Typography variant="h6">Products</Typography>
                        <Button component={Link} to="/products">
                          More info {">"}
                        </Button>
                      </Alert>
                    </Grid>
                    {/* Vouchers */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Alert
                        icon={false}
                        variant="filled"
                        severity="success"
                        className={classes.statictisPaper}
                      >
                        <Typography variant="h4">
                          {vouchers.items.length || 0}
                        </Typography>
                        <Typography variant="h6">Vouchers</Typography>
                        <Button component={Link} to="/vouchers">
                          More info {">"}
                        </Button>
                      </Alert>
                    </Grid>
                    {/* Reviews */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Alert
                        icon={false}
                        variant="filled"
                        severity="error"
                        className={classes.statictisPaper}
                      >
                        <Typography variant="h4">0</Typography>
                        <Typography variant="h6">Reviews</Typography>
                        <Button component={Link} to="/reviews">
                          More info {">"}
                        </Button>
                      </Alert>
                    </Grid>
                  </Grid>
                </Paper>
              </Collapse>
            </Grid>

            {/* Order and user chart*/}
            <Grid item container spacing={3}>
              {/* Orders chart */}
              <Grid item xs={12} sm={12} md={6}>
                <ButtonBase
                  className={classes.sectionBtn}
                  onClick={handleOrderChartCollapse}
                >
                  <Typography variant="h6">New Orders past 7 days</Typography>
                  {openOrderChartCollapse ? <ExpandLess /> : <ExpandMore />}
                </ButtonBase>
                <Collapse
                  in={openOrderChartCollapse}
                  timeout="auto"
                  unmountOnExit
                >
                  <Paper
                    className={classes.padding}
                    style={{ height: 300 }}
                    elevation={4}
                  >
                    <OrdersChart />
                  </Paper>
                </Collapse>
              </Grid>

              {/* User chart */}
              <Grid item xs={12} sm={12} md={6}>
                <ButtonBase
                  className={classes.sectionBtn}
                  onClick={handleUserChartCollapse}
                >
                  <Typography variant="h6">New Users past 7 days</Typography>
                  {openUserChartCollapse ? <ExpandLess /> : <ExpandMore />}
                </ButtonBase>
                <Collapse
                  in={openUserChartCollapse}
                  timeout="auto"
                  unmountOnExit
                >
                  <Paper
                    className={classes.padding}
                    style={{ height: 300 }}
                    elevation={4}
                  >
                    {/* <UsersChart /> */}
                  </Paper>
                </Collapse>
              </Grid>
            </Grid>

            {/* Lastest Order and Total */}
            <Grid item container spacing={2}>
              {/* Lastest Order */}
              <Grid item xs={12} sm={12} md={7}>
                <ButtonBase
                  className={classes.sectionBtn}
                  onClick={handleLastestOrderCollapse}
                >
                  <Typography variant="h6">Lastest Order</Typography>
                  {openLastestOrderCollapse ? <ExpandLess /> : <ExpandMore />}
                </ButtonBase>
                <Collapse
                  in={openLastestOrderCollapse}
                  timeout="auto"
                  unmountOnExit
                >
                  <Paper
                    className={classes.padding}
                    style={{ height: 400 }}
                    elevation={4}
                  >
                    <Button
                      component={Link}
                      to="/orders"
                      color="secondary"
                      variant="outlined"
                    >
                      View all orders
                    </Button>
                    <TableContainer className={classes.tableContainer}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                        size={"small"}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Order status</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Create at</TableCell>
                            <TableCell align="right">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orders.items.slice(0, 10).map((row) => (
                            <TableRow key={row.id}>
                              <TableCell component="th" scope="row">
                                {row.id}
                              </TableCell>
                              <TableCell>
                                <Typography
                                  display="inline"
                                  className={clsx({
                                    [classes.status]: true,
                                    [classes.processing]:
                                      row.status === "processing",
                                    [classes.shipping]:
                                      row.status === "shipping",
                                    [classes.completed]:
                                      row.status === "completed",
                                    [classes.cancelled]:
                                      row.status === "cancelled",
                                  })}
                                >
                                  {row.status}
                                </Typography>
                              </TableCell>
                              <TableCell>{row.user}</TableCell>
                              <TableCell align="right">
                                {(row.amount || 0).toLocaleString()}
                              </TableCell>
                              <TableCell align="right">
                                {new Date(
                                  row.created_at || {}
                                ).toLocaleString()}
                              </TableCell>
                              <TableCell align="right">
                                <Tooltip title="Edit" aria-label="edit">
                                  <IconButton
                                    size="small"
                                    component={Link}
                                    to={`/orders-edit/${row.id}`}
                                    aria-label="edit"
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Collapse>
              </Grid>

              {/* Total */}
              <Grid item xs={12} sm={12} md={5}>
                <ButtonBase
                  className={classes.sectionBtn}
                  onClick={handleTotalCollapse}
                >
                  <Typography variant="h6">Total past 7 days</Typography>
                  {openTotalCollapse ? <ExpandLess /> : <ExpandMore />}
                </ButtonBase>
                <Collapse in={openTotalCollapse} timeout="auto" unmountOnExit>
                  <Paper
                    className={classes.padding}
                    style={{ height: 300 }}
                    elevation={4}
                  >
                    <Grid container direction="row" spacing={1}>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1">Date</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="subtitle1"
                          className={classes.total}
                        >
                          Earn Total
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="subtitle1"
                          className={classes.discountTotal}
                        >
                          Discount Total
                        </Typography>
                      </Grid>
                    </Grid>
                    {orderData.map((item, index) => (
                      <Grid
                        key={index}
                        container
                        direction="row"
                        spacing={1}
                        justify="space-between"
                      >
                        <Grid item xs={4}>
                          <Typography variant="subtitle1">
                            {item.day}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            variant="subtitle1"
                            className={classes.total}
                          >
                            {item.orderInDay
                              .reduce((sum, { total }) => sum + total, 0)
                              .toLocaleString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            variant="subtitle1"
                            className={classes.discountTotal}
                          >
                            {item.orderInDay
                              .reduce((sum, { discount }) => sum + discount, 0)
                              .toLocaleString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Paper>
                </Collapse>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      </AdminLayout>
    </React.Fragment>
  );
}
