import React from "react";
import marked from "marked";
import hljs from "highlight.js";
import { Tags } from "../../Views/Kanban";

class Preview extends React.Component {
  rawMarkup = () => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });

    var rawMarkup = marked(this.props.content.description || "", {
      sanitize: true
    });
    return {
      __html: rawMarkup
    };
  };

  render() {
    return (
      <div id="preview-mode">
        <div>ID: {this.props.content.id}</div>
        <div>Title: {this.props.content.title}</div>
        <div>Description: </div>
        <div dangerouslySetInnerHTML={this.rawMarkup()} />
        <div>Tags: </div>
        <Tags tagIds={this.props.content.tagIds} />
      </div>
    );
  }
}

export default Preview;
