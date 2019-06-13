import React from "react";
import { ButtonGroup } from "components/UI/PageComponents";
import { Button } from "components/UI/PageComponents/Button";

export interface Props {
  onAccept?: () => void;
  onCancel?: () => void;
  acceptTitle?: string;
  cancelTitle?: string;
  acceptClassName?: string;
  cancelClassName?: string;
}

export const AcceptCancelButtons = ({
  onAccept,
  onCancel,
  acceptClassName,
  cancelClassName,
  acceptTitle,
  cancelTitle
}: Props) => {
  return (
    <ButtonGroup>
      {acceptTitle && (
        <Button onClick={onAccept} className={acceptClassName}>
          {acceptTitle}
        </Button>
      )}
      {cancelTitle && (
        <Button onClick={onCancel} className={cancelClassName}>
          {cancelTitle}
        </Button>
      )}
    </ButtonGroup>
  );
};
