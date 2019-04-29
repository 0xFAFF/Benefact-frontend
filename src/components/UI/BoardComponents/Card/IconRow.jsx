import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "../../../UI";

const IconRow = card => {
  const { description } = card;
  return description ? (
    <div className="card-icon-row">
      <Tooltip id="icon-row" />
      <FontAwesomeIcon
        icon="newspaper"
        size="lg"
        data-for="icon-row"
        data-tip="This card has a description"
      />
    </div>
  ) : null;
};

IconRow.propTypes = {
  card: PropTypes.shape({
    description: PropTypes.string
  })
};

export default IconRow;
