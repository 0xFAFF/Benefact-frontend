import React from "react";
import PropTypes from "prop-types";
import { getTags } from "../../../../utils";
import { AddTag } from "../../AddComponents";
import DisplayTag from "./DisplayTag";
import "./index.scss";
import { PageConsumer } from "components/Pages/PageContext";

const Tags = props => {
  const { tagIds, displayAddTag, onChangeHandler, handleUpdate, updateBoardContent } = props;
  return (
    <PageConsumer>
      {page => {
        const tags = getTags(page.data.tags, tagIds);
        return (
          <div className="card-tags">
            {tags.map(tag => (
              <DisplayTag tag={tag} key={tag.id} />
            ))}
            {displayAddTag && (
              <div className="tag">
                <AddTag
                  cardTags={tags}
                  onChangeHandler={onChangeHandler}
                  handleUpdate={handleUpdate}
                  updateBoardContent={updateBoardContent}
                />
              </div>
            )}
          </div>
        );
      }}
    </PageConsumer>
  );
};

Tags.propTypes = {
  tagIds: PropTypes.array,
  displayAddTag: PropTypes.bool,
  onChangeHandler: PropTypes.func,
  handleUpdate: PropTypes.func,
  updateBoardContent: PropTypes.func
};

export default Tags;
