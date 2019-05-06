import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "components/UI";
import "./index.scss";

const NavbarList = props => {
  const { configs, onItemClick } = props;
  return (
    <div className="navbar-list">
      <div key="menu" className="navbar-list-container">
        <div className="navbar-top-left">
          <img src="/fafficon.png" alt="FAFF Games LLC" />
        </div>
        <Tooltip id="navbar-tooltip" />
        <ul className="menu flex grow">
          {configs.map((section, index) => {
            return (
              <div
                key={`menu ${index}`}
                className={`grow row ${index === configs.length - 1 && "pull-right"}`}
              >
                {section.map(item => {
                  const { id, icon, title, className = null, url, hide, tooltip } = item;
                  if (hide) return null;
                  return (
                    <Fragment key={id}>
                      <li
                        data-tip={tooltip}
                        data-for="navbar-tooltip"
                        className={className}
                        onClick={() => {
                          if (className !== "brand" && !url) onItemClick(id, index);
                        }}
                      >
                        <div className="icon-title">
                          {icon && <FontAwesomeIcon icon={icon} style={{ fontSize: "1.5em" }} />}
                          {title ? <span>{title}</span> : null}
                        </div>
                      </li>
                    </Fragment>
                  );
                })}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

NavbarList.propTypes = {
  configs: PropTypes.array,
  onItemClick: PropTypes.func
};

export default NavbarList;
