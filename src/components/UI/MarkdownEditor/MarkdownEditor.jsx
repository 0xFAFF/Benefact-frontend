import React from "react";
import PropTypes from "prop-types";
import marked from "marked";
import TextArea from "react-textarea-autosize";
import hljs from "highlight.js";
import "./MarkdownEditor.scss";

class MarkdownEditor extends React.Component {
  state = {
    editing: false
  };

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

    const rawMarkup = marked(this.props.value || "", {
      sanitize: true
    });
    return {
      __html: rawMarkup
    };
  };

  onBlur = (e) => {
    this.setState({ editing: false });
    if(this.props.onBlur)
      this.props.onBlur(e);
  };

  render = () => {
    return (
      <div id="markdown-editor">
        {this.state.editing ? (
          <TextArea
            className="editor-text-area"
            {...this.props}
            autoFocus
            minRows={1}
            value={this.props.value}
            onBlur={this.onBlur}
          />
        ) : (
          <div
            className={this.props.className || "editor-text-area"}
            id="preview-mode"
            onClick={() => this.setState({ editing: true })}
            dangerouslySetInnerHTML={this.rawMarkup()}
          />
        )}
      </div>
    );
  };
}

MarkdownEditor.propTypes = {
  content: PropTypes.string,
  onChange: PropTypes.func
};

export default MarkdownEditor;
