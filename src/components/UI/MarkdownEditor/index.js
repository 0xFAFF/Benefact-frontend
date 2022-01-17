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
    renderer.listitem = (text, task, checked) => `<li ${task ? "class=nostyle" : ""}>${text}</li>`;
    renderer.link = (dst, _, text) => `<a target="_blank" href="${dst}">${text}</a>`;
    renderer.checkbox = (checked) => `<div class="checkmark">${checked ? "<span class=\"check\"></span>" : ""}</div>`;
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
  onClick = e => {
    if(e.target.tagName === "A") return;
    this.setState({ editing: true })
  }

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
        onClick={allowEdit ? this.onClick : null}
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
