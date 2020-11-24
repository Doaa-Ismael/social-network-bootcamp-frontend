import { useQuery } from "@apollo/client";
import { Loading } from "components/Loading";
import NotFound from "components/NotFound";
import { GET_AUTH_USER } from "graphql/user";
import AuthLayout from "pages/Auth/AuthLayout";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppLayout from "./AppLayout";
import { GlobalStyle } from "./GlobalStyles";
import ScrollToTop from "./ScrollToTop";

/**
 * Root component of the app
 */
const App = () => {
  // eslint-disable-next-line no-unused-vars
  const { loading, subscribeToMore, data, error, refetch } = useQuery(
    GET_AUTH_USER
  );

  if (loading) return <Loading top="xl" />;
  if (error) {
    const isDevelopment =
      !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    if (isDevelopment) {
      console.error(error);
    }
    const devErrorMessage =
      "Sorry, something went wrong. Please open the browser console to view the detailed error message.";
    const prodErrorMessage =
      "Sorry, something went wrong. We're working on getting this fixed as soon as we can.";
    return (
      <NotFound
        message={isDevelopment ? devErrorMessage : prodErrorMessage}
        showHomePageLink={false}
      />
    );
  }

  return (
    <Router>
      <GlobalStyle />

      <ScrollToTop>
        <Switch>
          {data.getAuthUser ? (
            <Route
              exact
              render={() => <AppLayout authUser={data.getAuthUser} />}
            />
          ) : (
            <Route exact render={() => <AuthLayout refetch={refetch} />} />
          )}
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default App;
