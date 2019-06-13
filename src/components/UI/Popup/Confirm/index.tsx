import React, { ReactNode } from "react";
import { AcceptCancelButtons, Props } from "components/UI/PageComponents/AcceptCancelButtons";
import "./index.scss";

const Confirm = (props: Props & { children?: ReactNode; confirmMessage?: string }) => {
  const { confirmMessage = "Are you sure?", children, ...rest } = props;
  if(!rest.acceptTitle) rest.acceptTitle = "Confirm";
  if(!rest.cancelTitle) rest.cancelTitle = "Cancel";
  return (
    <>
      <div className="section xlg">{confirmMessage}</div>
      {children}
      <AcceptCancelButtons {...rest} />
    </>
  );
};

export default Confirm;
