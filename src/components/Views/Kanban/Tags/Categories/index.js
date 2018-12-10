import React from "react";
import { TagsConsumer } from "..";
import { getTags } from "../../../../../utils";
import { AddCategory } from "../../../../UI/AddComponent";

import "./index.scss";

const InnerList = ({ tag }) => {
  const { name, color, character } = tag;
  const displayTag = <div>{character || name}</div>;
  return (
    <li
      style={{
        backgroundColor: color || "inherit",
        border: color ? "none" : "1px solid lightgray"
      }}
    >
      {displayTag}
    </li>
  );
};

class Categories extends React.Component {
  render() {
    return (
      <TagsConsumer>
        {context => {
          const tags = getTags(context, this.props.tagIds);
          return (
            <div id="card-categories">
              <ul className="tags-ul">
                {tags.map(tag => (
                  <InnerList tag={tag} key={tag.id} />
                ))}
                {this.props.displayAddCategory && (
                  <li>
                    <AddCategory
                      cardTags={tags}
                      onChangeHandler={this.props.onChangeHandler}
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

export default Categories;
