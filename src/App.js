import React, { useEffect } from "react";
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
            {/* <AdminRoute
              exact
              path="/products-edit/:id"
              component={ProductEdit}
            ></AdminRoute> */}
            <AdminRoute exact path="/setting" component={Setting}></AdminRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
