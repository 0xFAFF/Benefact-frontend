import React from "react";
import { TagsConsumer } from "../../..";
import { getTags } from "../../../../../utils";
import "./index.scss";

const InnerList = ({ tag }) => {
  const displayTag = tag.color ? (
    <div
      style={{
        backgroundColor: tag.color,
        width: "20px",
        height: "20px"
      }}
    />
  ) : tag.character ? (
    tag.character
  ) : (
    "N/A"
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
              </ul>
            </div>
          );
        }}
      </TagsConsumer>
    );
  }
}

export default Categories;
