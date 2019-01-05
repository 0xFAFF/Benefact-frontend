import React from "react";
import { TagsConsumer } from "./TagsContext";
import { getTags } from "../../../../utils";
import { AddTag } from "../../AddComponents";
import DisplayTag from "./DisplayTag";
import "./index.scss";

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
                  <DisplayTag tag={tag} key={tag.id} />
                ))}
                {this.props.displayAddTag && (
                  <li>
                    <AddTag
                      cardTags={tags}
                      onChangeHandler={this.props.onChangeHandler}
                      addComponent={this.props.addComponent}
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
