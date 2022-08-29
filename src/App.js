import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security, SecureRoute } from "@okta/okta-react";
import Home from "./pages/home";
import MyInfo from "./pages/myInfo";
import NavBar from "./components/navBar";

const oktaAuth = new OktaAuth({
  issuer: "https://{DOMAIN}/oauth2/default",
  clientId: "{CLIENT_ID}",
  redirectUri: window.location.origin + "/login/callback",
});

const App = () => {
  let history = useHistory();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <NavBar />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/login/callback" component={LoginCallback} />
        <SecureRoute path="/info" component={MyInfo} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Security>
  );
};

const RouterApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default RouterApp;
