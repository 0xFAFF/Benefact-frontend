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

  onBlur = e => {
    this.setState({ editing: false });
    if (this.props.onBlur) this.props.onBlur(e);
  };

  handleKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      this.onBlur();
    }
  };

  render = () => {
    const { allowEdit = true, ...rest } = this.props;
    return this.state.editing ? (
      <TextArea
        {...rest}
        className={`markdown-area markdown-edit`}
        autoFocus
        minRows={1}
        value={this.props.value}
        onBlur={this.onBlur}
        onKeyPress={this.handleKeyPress}
      />
    ) : (
      <div
        className={`${allowEdit && "editable"} markdown-area markdown-preview`}
        id="preview-mode"
        onClick={allowEdit ? () => this.setState({ editing: true }) : null}
        dangerouslySetInnerHTML={this.rawMarkup()}
      />
    );
  };
}

MarkdownEditor.propTypes = {
  content: PropTypes.string,
  onChange: PropTypes.func,
  allowEdit: PropTypes.bool
};

export default MarkdownEditor;
