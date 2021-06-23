import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "@fontsource/roboto/400.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
