import React from "react";
import { useOktaAuth } from "@okta/okta-react";

const Home = () => {
  let { authState } = useOktaAuth();
  return (
    <div className="container m-5">
      Welcome To Homepage {authState?.idToken?.claims.name ?? ""} !
    </div>
  );
};

export default Home;
