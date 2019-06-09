import React from "react";

const PageContext = React.createContext({});

export const PageProvider = PageContext.Provider;
export const PageConsumer = PageContext.Consumer;
export interface PageType {
  compFetch(type: string, action: string, queryParams?: any, errorHandler?: any): any;
  history: { push(url: string): void };
}
export interface PageProps {
  page: PageType;
}
export const PageProp = <T extends {}>(Comp: React.ComponentType<T & PageProps>) => (props: T) =>
  (props as any).page ? (
    <Comp page={(props as any).page} {...props} />
  ) : (
    <PageConsumer>{page => <Comp page={page as PageType} {...props} />}</PageConsumer>
  );
