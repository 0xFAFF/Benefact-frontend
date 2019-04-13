import React from "react";
import { ErrorMessage } from "../components";
import Verification from "../../../Views/Login/Verification";

const withErrorHandling = WrappedComponent => ({
  showError,
  error,
  email,
  children
}) => {
  if (showError) {
    console.log(error.status);
    if (error.info.status === 401 || error.info.status === 403) {
      return <Verification email={email} />;
    }
    // throw new FetchError(error.status, error.statusText, error.statusText);
  }
  return (
    <WrappedComponent>
      {showError && <ErrorMessage />}
      {children}
    </WrappedComponent>
  );
};

export default withErrorHandling;
