import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SelectTag = props => {
  const { tagsList, onChangeHandler, cardTags } = props;
  return (
    <ul className="categories-ul">
      {tagsList.map(tag => (
        <li key={tag.id} onClick={() => onChangeHandler(tag.id, "category")}>
          <div
            style={{
              backgroundColor: tag.color ? tag.color : "lightgray"
            }}
            className="categories-li-container"
          >
            <div className="categories-label">
              {tag.character ? tag.character : tag.name}
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
