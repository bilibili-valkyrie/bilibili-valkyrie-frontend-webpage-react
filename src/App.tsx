import "@fontsource/roboto/400.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MySnackbarProvider from "./components/MySnackbarProvider";
import AddSubscribePage from "./pages/AddSubscribePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { store } from "./reducer/reducerCombiner";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <MySnackbarProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/addSubscribe">
              <AddSubscribePage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </MySnackbarProvider>
    </Provider>
  );
};

export default App;
