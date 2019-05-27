import React from "react";
import { ButtonGroup } from "components/UI/PageComponents";
import "./index.scss";

interface Props {
  onAcceptHandler?: void;
  onCancelHandler?: void;
  acceptTitle?: string;
  cancelTitle?: string;
}

export const AcceptCancelButtons = ({
  onAcceptHandler,
  onCancelHandler,
  acceptTitle,
  cancelTitle
}: Props) => {
  const btns = [
    {
      title: acceptTitle,
      onClick: onAcceptHandler,
      className: "button-accept"
    },
    {
      title: cancelTitle,
      onClick: onCancelHandler,
      className: "button-cancel"
    }
  ];
  return <ButtonGroup btns={btns} fluid />;
};
