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
    const renderer = new marked.Renderer();
    renderer.listitem = (text, task) => `<li ${task ? "class=nostyle" : ""}>${text}</li>`;
    marked.setOptions({
      renderer,
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
    if (!this.props.value) return { __html: this.props.placeholder || "" };
    const rawMarkup = marked(this.props.value, {
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

  render = () => {
    const { allowEdit = true, editing = false, ...rest } = this.props;

    let className = "markdown-area markdown-preview";
    if (!this.props.value) className += " empty";
    if (allowEdit) className += " editable";

    return editing || this.state.editing ? (
      <TextArea
        {...rest}
        className={`markdown-area markdown-edit`}
        autoFocus
        minRows={1}
        value={this.props.value}
        onBlur={this.onBlur}
      />
    ) : (
      <div
        className={className}
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
  allowEdit: PropTypes.bool,
  placeholder: PropTypes.string,
  editing: PropTypes.bool
};

export default MarkdownEditor;
