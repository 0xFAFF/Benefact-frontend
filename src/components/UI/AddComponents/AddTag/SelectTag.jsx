import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SelectTag = props => {
  const { tagsList, onChangeHandler, cardTags } = props;
  return (
    <ul className="tags-ul">
      {tagsList.map(tag => (
        <li key={tag.id} onClick={() => onChangeHandler(tag.id, "tag")}>
          <div
            style={{
              backgroundColor: tag.color ? tag.color : "#DDDDDD"
            }}
            className="tags-li-container"
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
        </li>
      ))}
    </ul>
  );
};

export default SelectTag;
