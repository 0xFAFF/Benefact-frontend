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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.editing) return { content: nextProps.content };
    else return {};
  }

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

    const rawMarkup = marked(this.state.content || "", {
      sanitize: true
    });
    return {
      __html: rawMarkup
    };
  };

  onBlur = () => {
    this.setState({ editing: false });
    this.props.onChange({ target: { value: this.state.content } });
  };

  render = () => {
    return (
      <div id="markdown-editor">
        {this.state.editing ? (
          <TextArea
            autoFocus
            className="editor-text-area"
            minRows={1}
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            onBlur={this.onBlur}
          />
        ) : (
          <div
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
