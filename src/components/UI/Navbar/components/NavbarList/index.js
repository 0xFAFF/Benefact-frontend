import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "components/UI";
import "./index.scss";

const NavbarList = props => {
  const {
    configs: { id: configId, ulClassName, options = [] },
    onItemClick
  } = props;
  return (
    <div className="navbar-list">
      <div key={configId} className="navbar-list-container">
        <div className="navbar-top-left">
          <img src="/fafficon.png" alt="FAFF Games LLC" />
        </div>
        <Tooltip id="navbar-tooltip" />
        <ul className={`${ulClassName} flex grow`}>
          {options.map((section, index) => {
            return (
              <div key={configId + index} className="flex row">
                {section.map(item => {
                  const { id, icon, title, liClassName = "", url, hide, tooltip } = item;
                  if (hide) return null;
                  return (
                    <Fragment key={id}>
                      <li
                        data-tip={tooltip}
                        data-for="navbar-tooltip"
                        className={liClassName}
                        onClick={e => {
                          if (liClassName !== "brand" && !url) onItemClick(id, index);
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
  configs: PropTypes.object,
  onItemClick: PropTypes.func
};

export default NavbarList;
