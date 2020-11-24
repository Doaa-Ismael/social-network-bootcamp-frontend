import { UserAPI } from "api";
import { Button, InputText } from "components/Form";
import { Spacing } from "components/Layout";
import { Error } from "components/Text";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import * as Routes from "routes";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  font-size: ${(p) => p.theme.font.size.xxs};
  margin-top: ${(p) => p.theme.spacing.sm};
`;

const InputContainer = styled(Spacing)`
  width: 100%;
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 1px;
`;

/**
 * Sign In page
 */
const SignIn = ({ history, location, refetch }) => {
  const [values, setValues] = useState({ emailOrUsername: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError("");
  }, [location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await UserAPI.signIn({ emailOrUsername, password });
      localStorage.setItem("token", response.token);
      await refetch();
      history.push(Routes.HOME);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const { emailOrUsername, password } = values;

  return (
    <form onSubmit={handleSubmit}>
      <Root>
        <InputContainer>
          {error && (
            <ErrorMessage>
              <Error size="xxs" color="white">
                {error}
              </Error>
            </ErrorMessage>
          )}

          <InputText
            autoFocus
            type="text"
            name="emailOrUsername"
            values={emailOrUsername}
            onChange={handleChange}
            placeholder="Email or Username"
            borderColor="white"
          />
        </InputContainer>

        <InputContainer left="xs" right="xs">
          <InputText
            type="password"
            name="password"
            values={password}
            onChange={handleChange}
            placeholder="Password"
            borderColor="white"
          />
        </InputContainer>

        <Button disabled={loading}>Log in</Button>
      </Root>
    </form>
  );
};

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default withRouter(SignIn);
