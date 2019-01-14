import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";

const TagWrapper = props => {
  const { tags, onSelectTagHandler, selectedTags = [] } = props;
  return (
    <div id="tag-wrapper-container">
      <ul className="tags-ul">
        {tags.map((tag, index) => (
          <li key={index}>
            <div
              style={{
                backgroundColor: tag.color ? tag.color : "#DDDDDD"
              }}
              className="tags-li-container"
              onClick={() => onSelectTagHandler(tag)}
            >
              <div className="tags-label">
                {tag.character ? (
                  <FontAwesomeIcon
                    icon={tag.character}
                    size="sm"
                    color="#000"
                  />
                ) : (
                  tag.name
                )}
              </div>
              {selectedTags.find(selectedTag => selectedTag.id === tag.id) && (
                <FontAwesomeIcon icon="check" size="sm" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagWrapper;
