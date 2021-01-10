import React from "react";
import { Router, Route, Switch } from "react-router-dom";

//Authority
import AdminRoute from "./components/AdminRoute";
import setAuthToken from "./store/setAuthToken";

//Containers
import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Setting from "./containers/Setting";
//>>Product
import ProductList from "./containers/Product/ProductList";
import ProductAdd from "./containers/Product/ProductAdd";
import ProductEdit from "./containers/Product/ProductEdit";
//>>Voucher
import VoucherList from "./containers/Voucher/VoucherList";
//>>Order
import OrderList from "./containers/Order/OrderList";
import OrderEdit from "./containers/Order/OrderEdit";
//>>Review
import ReviewList from "./containers/Review/ReviewList";

//Redux
import { useSelector } from "react-redux";

//Theme
import { lightTheme, darkTheme, history } from "./store";
import { ThemeProvider } from "@material-ui/core/styles";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  //Redux
  const theme = useSelector((state) => state.theme);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme.dark ? darkTheme : lightTheme}>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>

            <AdminRoute exact path="/" component={Dashboard}></AdminRoute>
            {/* Product */}
            <AdminRoute
              exact
              path="/products"
              component={ProductList}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/products-add"
              component={ProductAdd}
            ></AdminRoute>
            <AdminRoute
              exact
              path="/products-edit/:id"
              component={ProductEdit}
            ></AdminRoute>
            {/* Voucher */}
            <AdminRoute
              exact
              path="/vouchers"
              component={VoucherList}
            ></AdminRoute>
            {/* Order */}
            <AdminRoute exact path="/orders" component={OrderList}></AdminRoute>
            <AdminRoute
              exact
              path="/orders-edit/:id"
              component={OrderEdit}
            ></AdminRoute>
            {/* Review */}
            <AdminRoute
              exact
              path="/reviews"
              component={ReviewList}
            ></AdminRoute>
            <AdminRoute exact path="/setting" component={Setting}></AdminRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
