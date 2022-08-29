import React from "react";
import { useOktaAuth } from "@okta/okta-react";

const AuthNavItem = () => {
  let okta = useOktaAuth();

  const login = async () => {
    await okta.oktaAuth.signInWithRedirect();
  };

  const logout = async () => {
    await okta.oktaAuth.signOut();
  };

  let body = null;
  if (okta.authState?.isAuthenticated) {
    body = (
      <div className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="*"
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <img
            src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
            width="30"
            height="30"
            className="rounded-circle me-2"
            alt="profilePhoto"
          />
          {okta.authState.idToken.claims.email}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    body = (
      <button className="btn btn-outline-info" onClick={login}>
        Login
      </button>
    );
  }
  return body;
};

export default AuthNavItem;
