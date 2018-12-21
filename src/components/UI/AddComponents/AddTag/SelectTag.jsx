import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SelectTag = props => {
  const { tagsList, onChangeHandler, cardTags, handleOptionSelect } = props;
  return (
    <ul className="tags-ul">
      {tagsList.map(tag => (
        <li key={tag.id}>
          <div
            style={{
              backgroundColor: tag.color ? tag.color : "#DDDDDD"
            }}
            className="tags-li-container"
            onClick={() => onChangeHandler(tag.id, "tag")}
          >
            <div className="tags-label">
              {tag.character ? (
                <FontAwesomeIcon icon={tag.character} size="sm" color="#000" />
              ) : (
                tag.name
              )}
            </div>
            {cardTags.find(cardTag => cardTag.id === tag.id) && (
              <FontAwesomeIcon icon="check" size="sm" />
            )}
          </div>
          <div
            className="tags-edit-label"
            onClick={() => {
              handleOptionSelect("create", tag);
            }}
          >
            <FontAwesomeIcon icon="edit" size="sm" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SelectTag;
