import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Tooltip } from "components/UI";
import "./index.scss";

const NavbarList = props => {
  const { configs, onItemClick } = props;
  return (
    <div className="navbar-list">
      {configs.map(ulItem => {
        const { ulClassName, options = [] } = ulItem;
        return (
          <div key={ulItem.id} className="navbar-list-container">
            <div className="navbar-top-right" />
            <Tooltip id="navbar-tooltip" />
            <ul className={ulClassName}>
              {options.map(item => {
                const { id, icon, image, title, liClassName = "", url, hide, tooltip } = item;
                if (hide) return null;
                if (url)
                  return (
                    <Link to={url} key={id}>
                      <li
                        data-tip={tooltip}
                        data-for="navbar-tooltip"
                        key={id}
                        className={liClassName}
                      >
                        <div className="icon-title">
                          {icon && <FontAwesomeIcon icon={icon} style={{ fontSize: "1.5em" }} />}
                        </div>
                      </li>
                    </Link>
                  );
                return (
                  <Fragment key={id}>
                    <li
                      data-tip={tooltip}
                      data-for="navbar-tooltip"
                      className={liClassName}
                      onClick={e => {
                        if (liClassName !== "brand" && !url) onItemClick(id, ulItem.id);
                      }}
                    >
                      <div className="icon-title">
                        {icon && <FontAwesomeIcon icon={icon} style={{ fontSize: "1.5em" }} />}
                        {title ? <span>{title}</span> : null}
                      </div>
                      {image && <img src={image} alt={image} width="55" height="55" />}
                    </li>
                  </Fragment>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

NavbarList.propTypes = {
  configs: PropTypes.array,
  onItemClick: PropTypes.func
};

export default NavbarList;
