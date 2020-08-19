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
            <AdminRoute exact path="/setting" component={Setting}></AdminRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
