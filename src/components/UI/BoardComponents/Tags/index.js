import React from "react";
import PropTypes from "prop-types";
import { TagsConsumer } from "./TagsContext";
import { getTags } from "../../../../utils";
import { AddTag } from "../../AddComponents";
import DisplayTag from "./DisplayTag";
import "./index.scss";

const Tags = props => {
  const {
    tagIds,
    displayAddTag,
    onChangeHandler,
    addComponent,
    updateBoardContent
  } = props;
  return (
    <TagsConsumer>
      {context => {
        const tags = getTags(context, tagIds);
        return (
          <div id="card-tags">
            <ul className="tags-ul">
              {tags.map(tag => (
                <DisplayTag tag={tag} key={tag.id} />
              ))}
              {displayAddTag && (
                <li>
                  <AddTag
                    cardTags={tags}
                    onChangeHandler={onChangeHandler}
                    addComponent={addComponent}
                    updateBoardContent={updateBoardContent}
                  />
                </li>
              )}
            </ul>
          </div>
        );
      }}
    </TagsConsumer>
  );
};

Tags.propTypes = {
  tagIds: PropTypes.array,
  displayAddTag: PropTypes.bool,
  onChangeHandler: PropTypes.func,
  addComponent: PropTypes.func,
  updateBoardContent: PropTypes.func
};

export default Tags;
