import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TagWrapper.scss";

const TagWrapper = props => {
  const { tags, onChangeFilterHandler, selectedTags = [] } = props;
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
              onClick={() => onChangeFilterHandler(tag, "tags")}
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

TagWrapper.propTypes = {
  tags: PropTypes.array,
  onChangeFilterHandler: PropTypes.func,
  selectedTags: PropTypes.array
};

export default TagWrapper;
