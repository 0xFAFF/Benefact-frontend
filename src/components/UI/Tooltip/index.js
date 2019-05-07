import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import "./index.scss";

const Tooltip = ({ id, place = "bottom", delayShow = 300, effect = "solid" }) => {
  return (
    <ReactTooltip id={id} place={place} delayShow={delayShow} effect={effect} className="tooltip" />
  );
};

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  place: PropTypes.string,
  delayShow: PropTypes.number,
  effect: PropTypes.oneOf(["solid", "float"])
};

export default Tooltip;
