import React from "react";
import PropTypes from "prop-types";
import marked from "marked";
import hljs from "highlight.js";
import { Tags } from "../../BoardComponents";
import "./index.scss";

const Preview = props => {
  const { content } = props;
  const { id, title, description, tagIds } = content;
  const rawMarkup = () => {
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

    const rawMarkup = marked(description || "", {
      sanitize: true
    });
    return {
      __html: rawMarkup
    };
  };

  return (
    <div id="preview-mode">
      <div className="preview-id">ID: {id}</div>
      <div className="preview-title">Title: {title}</div>
      <div className="preview-description">Description: </div>
      <div dangerouslySetInnerHTML={rawMarkup()} />
      <div className="preview-tags">Tags: </div>
      <Tags tagIds={tagIds} />
    </div>
  );
};

Preview.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    tagIds: PropTypes.array
  })
};

export default Preview;
