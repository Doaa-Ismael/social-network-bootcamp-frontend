import { useApolloClient } from "@apollo/client";
import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import * as Routes from "routes";
import { useStore } from "store";
import { CLEAR_AUTH_USER } from "store/auth";

/**
 * Component that signs out the user
 */
const SignOut = ({ history }) => {
  const client = useApolloClient();
  const [, dispatch] = useStore();

  const handleSignOut = () => {
    dispatch({ type: CLEAR_AUTH_USER });
    localStorage.removeItem("token");
    client.resetStore();
    history.push(Routes.HOME);
  };

  return (
    <button text onClick={handleSignOut}>
      Sign out
    </button>
  );
};

SignOut.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(SignOut);
