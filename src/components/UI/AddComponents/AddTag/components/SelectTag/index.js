import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";
import DisplayTag from "components/UI/BoardComponents/Tags/DisplayTag";

const SelectTag = props => {
  const { tagsList, onChangeHandler, cardTags, handleOptionSelect } = props;
  if (tagsList.length === 0) return null;
  return (
    <div className="select-tag section">
      <ul className="tags-ul">
        {tagsList.map((tag, index) => (
          <li key={index}>
            <div className="center flex">
              <FontAwesomeIcon
                icon="check"
                size="sm"
                className={"center" + (cardTags.find(t => t.id === tag.id) ? "" : " hidden")}
              />
            </div>
            <DisplayTag className="lg" tag={tag} onClick={() => onChangeHandler(tag.id, "tag")} />
            <div
              className="tags-edit-label center flex"
              onClick={() => {
                handleOptionSelect("create", tag);
              }}
            >
              <FontAwesomeIcon icon="edit" size="sm" className="center" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

SelectTag.propTypes = {
  tagsList: PropTypes.array,
  onChangeHandler: PropTypes.func,
  cardTags: PropTypes.array,
  handleOptionSelect: PropTypes.func
};

export default SelectTag;
