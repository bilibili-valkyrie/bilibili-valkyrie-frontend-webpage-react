import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "@fontsource/roboto/400.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MySnackbarProvider from "./components/MySnackbarProvider";

const App = (): JSX.Element => {
  return (
    <MySnackbarProvider>
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
    </MySnackbarProvider>
  );
};

export default App;
