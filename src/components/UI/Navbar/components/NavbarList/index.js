import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "components/UI";
import "./index.scss";

const NavbarList = props => {
  const {
    configs: { listConfig = [], navbarClassName = "" },
    onItemClick
  } = props;
  return (
    <div className={`navbar-list ${navbarClassName}`}>
      <div key="menu" className="navbar-list-container">
        <Tooltip id="navbar-tooltip" />
        <ul className={"menu flex grow"}>
          {listConfig.map((section, index) => {
            return (
              <div key={`menu ${index}`} className={`grow-even row`}>
                {section.map(item => {
                  const { id, icon, title, className = null, url, hide, tooltip, img } = item;
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
                          {img ? <span>{img}</span> : null}
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
  configs: PropTypes.shape({
    listConfig: PropTypes.array,
    navbarClassName: PropTypes.string
  }),
  onItemClick: PropTypes.func
};

export default NavbarList;
