import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "./index.css";
import NavBar from "./components/navbar/NavBar";
import { isHideHeader } from "./routers/layout-config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
