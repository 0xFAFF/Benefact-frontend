import React from "react";
import { ButtonGroup } from "components/UI/PageComponents";

interface Props {
  onAcceptHandler?: () => void;
  onCancelHandler?: () => void;
  acceptTitle?: string;
  cancelTitle?: string;
}

export const AcceptCancelButtons = ({
  onAcceptHandler,
  onCancelHandler,
  acceptTitle,
  cancelTitle
}: Props) => {
  let btns = [];
  if (acceptTitle)
    btns.push({
      title: acceptTitle,
      onClick: onAcceptHandler,
      className: "button-accept"
    });
  if (cancelTitle)
    btns.push({
      title: cancelTitle,
      onClick: onCancelHandler,
      className: "button-cancel"
    });
  return <ButtonGroup btns={btns} fluid />;
};
