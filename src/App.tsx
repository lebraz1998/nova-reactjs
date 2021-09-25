import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import RouteApp from "./router";

function App() {
  store.subscribe(() => {
    console.log(store.getState().login.username);
    sessionStorage.setItem("login", store.getState().login.username);
  });
  return (
    <Provider store={store}>
      <RouteApp></RouteApp>
    </Provider>
  );
}

export default App;
