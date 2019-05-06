import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconRow = card => {
  const { description, attachments, comments, className } = card;
  const iconProps = {
    size: "lg",
    "data-for": "card",
    "data-tip": "This card has a description",
    className: "secondary"
  };
  return (
    <div className={className}>
      {description && <FontAwesomeIcon icon="newspaper" {...iconProps} />}
      {Boolean(attachments.length) && <FontAwesomeIcon icon="paperclip" {...iconProps} />}
      {Boolean(comments.length) && <FontAwesomeIcon icon="comments" {...iconProps} />}
    </div>
  );
};

IconRow.propTypes = {
  card: PropTypes.shape({
    description: PropTypes.string
  })
};

export default IconRow;
