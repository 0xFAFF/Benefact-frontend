import React from "react";
import { TagsConsumer } from "..";
import { getTags } from "../../../../../utils";
import { AddCategory } from "../../../../UI/AddComponent";

import "./index.scss";

const InnerList = ({ tag }) => {
  const { name, color, character } = tag;
  const displayTag = (
    <div
      style={{
        backgroundColor: color || "inherit",
        border: color ? "none" : "1px solid lightgray"
      }}
    >
      {character || name}
    </div>
  );
  return <li>{displayTag}</li>;
};

class Categories extends React.Component {
  render() {
    return (
      <TagsConsumer>
        {context => {
          const tags = getTags(context, this.props.categories);
          return (
            <div id="card-categories">
              <ul className="tags-ul">
                {tags.map(tag => (
                  <InnerList tag={tag} key={tag.id} />
                ))}
                {this.props.displayAddCategory && (
                  <li>
                    <AddCategory />
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
