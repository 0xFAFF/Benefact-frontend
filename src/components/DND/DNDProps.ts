import { ReactNode } from "react";

export interface DNDProps {
  children(props: any, snapshot: any): ReactNode;
}
