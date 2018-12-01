import React from "react";

const TagsContext = React.createContext({});

export const TagsProvider = TagsContext.Provider;
export const TagsConsumer = TagsContext.Consumer;
