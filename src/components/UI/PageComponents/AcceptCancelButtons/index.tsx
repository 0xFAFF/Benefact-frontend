import React from "react";
import { ButtonGroup } from "components/UI/PageComponents";
import { Button } from "components/UI/PageComponents/Button";

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
  return (
    <ButtonGroup>
      {acceptTitle && (
        <Button onClick={onAcceptHandler} className="button-accept">
          {acceptTitle}
        </Button>
      )}
      {cancelTitle && (
        <Button onClick={onCancelHandler} className="button-cancel">
          {cancelTitle}
        </Button>
      )}
    </ButtonGroup>
  );
};
