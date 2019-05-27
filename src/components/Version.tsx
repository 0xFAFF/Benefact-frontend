import React from "react";

export const Version = () => {
  return <div>{process.env.REACT_APP_GIT_COMMIT}</div>;
};
