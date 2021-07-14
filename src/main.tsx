import React from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line import/no-unresolved
import { registerSW } from "virtual:pwa-register";
import App from "./App";

registerSW({
  onOfflineReady() {
    // show a ready to work offline to user
  },
});
ReactDOM.render(<App />, document.getElementById("root"));
