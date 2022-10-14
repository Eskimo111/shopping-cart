import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "./index.css";
import NavBar from "./components/navbar/NavBar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HashRouter>
      <NavBar />
      <App />
    </HashRouter>
  </Provider>
);
