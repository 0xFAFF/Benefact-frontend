import React from "react";

const PageContext = React.createContext({});

export const PageProvider = PageContext.Provider;
export const PageConsumer = PageContext.Consumer;
export const PageProp = (Comp: React.ElementType) => (props: any) =>
  props.page ? (
    <Comp {...props} />
  ) : (
    <PageConsumer>{page => <Comp page={page} {...props} />}</PageConsumer>
  );
