import React from "react";
import withErrorHandling from "../withErrorHandling";
import "./index.scss";

const ErrorHandling = withErrorHandling(({ children }) => (
  <div id="error-handling">{children}</div>
));

export default ErrorHandling;
