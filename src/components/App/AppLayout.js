import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import SignOut from "./SignOut";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
  position: relative;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    width: ${(p) => p.theme.screen.md};
  }

  @media (min-width: ${(p) => parseInt(p.theme.screen.lg, 10) + 20 + "px"}) {
    width: ${(p) => p.theme.screen.lg};
  }
`;

/**
 * Main layout of the app, when user is authenticated
 */
const AppLayout = ({ authUser }) => {
  return (
    <Root>
      <p>
        Logged In as {authUser.fullName}: {authUser.bio}
      </p>
      <SignOut />
    </Root>
  );
};

AppLayout.propTypes = {
  authUser: PropTypes.object.isRequired,
};

export default withRouter(AppLayout);
