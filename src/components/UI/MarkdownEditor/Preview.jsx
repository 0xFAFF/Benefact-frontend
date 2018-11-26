import React from "react";
import marked from "marked";

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
      smartypants: false
      // highlight: function (code) {
      //     return hljs.highlightAuto(code).value
      // }
    });

    var rawMarkup = marked(this.props.content, { sanitize: true });
    return {
      __html: rawMarkup
    };
  };

  render() {
    return (
      <div id="preview-mode">
        <div dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
}

export default Preview;
