import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardComponent from "./page/dashboard/dashboard";
import LoginComponent from "./page/login/login";
import { useHistory } from "react-router-dom";
import { setLogin } from "./redux/loginSlice";
export default function RouteApp() {
  const state = useSelector((state: any) => state.login.username),
    dispatch = useDispatch();
  return (
    <Router>
      <Switch>
        <Route
          path={"/"}
          exact
          render={() => {
            if (state === "") {
              window.location = "/login" as any;
              return <LoginComponent />;
            }

            return (
              <React.Fragment>
                <Box sx={{ flexGrow: 1 }}>
                  <AppBar position="static">
                    <Toolbar>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                      >
                        Dashboard
                      </Typography>
                      <Button
                        onClick={() => {
                          sessionStorage.removeItem("login");
                          dispatch(setLogin({ username: "", type: "login" }));
                          window.location = "/login" as any;
                        }}
                        color="inherit"
                      >
                        Logout
                      </Button>
                    </Toolbar>
                  </AppBar>
                </Box>

                <DashboardComponent />
              </React.Fragment>
            );
          }}
        />
        <Route path={"/login"} component={LoginComponent} />
      </Switch>
    </Router>
  );
}
