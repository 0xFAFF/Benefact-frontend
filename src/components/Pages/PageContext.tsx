import React from "react";
import { URLType } from "constants/URLS";

const PageContext = React.createContext({});

export const PageProvider = PageContext.Provider;
export const PageConsumer = PageContext.Consumer;
export interface PageType {
  compFetch(type: string, action: string, queryParams?: any, errorHandler?: any): Promise<any>;
  urlFetch(url: URLType, queryParams?: any, errorHandler?: any): Promise<any>;
  refreshData(promise: Promise<any> | null): Promise<any>;
  history: { push(url: string): void };
  data: any;
  user: { id: number };
}
export interface PageProps {
  page: PageType;
}
export const PageProp = <T extends {}>(Comp: React.ComponentType<T & PageProps>) => (props: T) => {
  return (props as any).page ? (
    <Comp page={(props as any).page} {...props} />
  ) : (
    <PageConsumer>{page => <Comp page={page as PageType} {...props} />}</PageConsumer>
  );
};
