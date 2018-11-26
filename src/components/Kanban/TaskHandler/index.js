import React from "react";
import "./index.scss";

class TaskHandler extends React.Component {
  render() {
    return <div id="task-handler" {...this.props.dragHandleProps} />;
  }
}

export default TaskHandler;
