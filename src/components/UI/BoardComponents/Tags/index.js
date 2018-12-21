import React from "react";
import { TagsConsumer } from "./TagsContext";
import { getTags } from "../../../../utils";
import { AddTag } from "../../AddComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.scss";

const InnerList = ({ tag }) => {
  const { name, color, character } = tag;
  const displayTag = (
    <div>
      {character ? (
        <FontAwesomeIcon icon={character} size="lg" color="#000" />
      ) : (
        name
      )}
    </div>
  );
  return (
    <li
      style={{
        backgroundColor: color || "#dddddd",
        border: color ? "none" : "1px solid lightgray"
      }}
    >
      {displayTag}
    </li>
  );
};

class Tags extends React.Component {
  render() {
    return (
      <TagsConsumer>
        {context => {
          const tags = getTags(context, this.props.tagIds);
          return (
            <div id="card-tags">
              <ul className="tags-ul">
                {tags.map(tag => (
                  <InnerList tag={tag} key={tag.id} />
                ))}
                {this.props.displayAddTag && (
                  <li>
                    <AddTag
                      cardTags={tags}
                      onChangeHandler={this.props.onChangeHandler}
                      addNewTag={this.props.addNewTag}
                      updateBoardContent={this.props.updateBoardContent}
                    />
                  </li>
                )}
              </ul>
            </div>
          );
        }}
      </TagsConsumer>
    );
  }
}

export default Tags;
