import React from "react";
import { ErrorMessage } from "../components";

const withErrorHandling = WrappedComponent => ({
  showError,
  errorMessage,
  children
}) => {
  if (showError) {
    throw new Error(errorMessage);
  }
  return (
    <WrappedComponent>
      {showError && <ErrorMessage />}
      {children}
    </WrappedComponent>
  );
};

export default withErrorHandling;
