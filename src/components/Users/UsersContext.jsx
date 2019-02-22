import React from "react";

const UsersContext = React.createContext({});

export const UsersProvider = UsersContext.Provider;
export const UsersConsumer = UsersContext.Consumer;
