import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconRow = ({ className: cname, card, userMap = {} }) => {
  const { description, attachments, comments, assigneeId } = card;
  const iconProps = {
    size: "lg",
    "data-for": "card",
    "data-tip": "This card has a description",
    className: "secondary"
  };
  let className = "row card-icon-row";
  if (cname) className += " " + cname;
  return (
    <div className={className}>
      {description && <FontAwesomeIcon icon="newspaper" {...iconProps} />}
      {Boolean(attachments.length) && <FontAwesomeIcon icon="paperclip" {...iconProps} />}
      {Boolean(comments.length) && <FontAwesomeIcon icon="comments" {...iconProps} />}
      {assigneeId !== null && (
        <div className="user-badge">
          <div>{((userMap[assigneeId] && userMap[assigneeId].name) || "?")[0].toUpperCase()}</div>
        </div>
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
