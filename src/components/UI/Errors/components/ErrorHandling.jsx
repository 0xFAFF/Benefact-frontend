import React from "react";
import withErrorHandling from "./withErrorHandling";

const ErrorHandling = withErrorHandling(({ children }) => (
  <div>{children}</div>
));

export default ErrorHandling;
