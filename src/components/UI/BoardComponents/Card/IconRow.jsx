import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconRow = card => {
  const { description, attachments, comments, className } = card;
  return (
    <div className={className}>
      {description && (
        <FontAwesomeIcon
          icon="newspaper"
          size="lg"
          data-for="card"
          data-tip="This card has a description"
        />
      )}
      {Boolean(attachments.length) && (
        <FontAwesomeIcon
          icon="paperclip"
          size="lg"
          data-for="card"
          data-tip="This card has a description"
        />
      )}
      {Boolean(comments.length) && (
        <FontAwesomeIcon
          icon="comments"
          size="lg"
          data-for="card"
          data-tip="This card has a description"
        />
      )}
    </div>
  );
};

IconRow.propTypes = {
  card: PropTypes.shape({
    description: PropTypes.string
  })
};

export default IconRow;
