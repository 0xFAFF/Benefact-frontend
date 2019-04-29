import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import "./index.scss";

const Tooltip = ({ id, place = "bottom", delayShow = 400 }) => {
  return (
    <ReactTooltip id={id} place={place} delayShow={delayShow} effect="solid" className="tooltip" />
  );
};

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  place: PropTypes.string,
  delayShow: PropTypes.number
};

export default Tooltip;
