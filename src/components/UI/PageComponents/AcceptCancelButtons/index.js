import React from "react";
import PropTypes from "prop-types";
import { ButtonGroup } from "components/UI/PageComponents";
import "./index.scss";

export const AcceptCancelButtons = props => {
  const { onAcceptHandler, onCancelHandler, acceptTitle, cancelTitle } = props;
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

AcceptCancelButtons.propTypes = {
  onAcceptHandler: PropTypes.func,
  onCancelHandler: PropTypes.func,
  acceptTitle: PropTypes.string,
  cancelTitle: PropTypes.string
};
