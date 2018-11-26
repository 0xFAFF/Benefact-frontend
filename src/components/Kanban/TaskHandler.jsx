import React from "react";

class TaskHandler extends React.Component {
  render() {
    return (
      <div
        style={{
          width: "10%",
          height: "100%",
          backgroundColor: "blue",
          borderRadius: "4px",
          marginRight: "8px"
        }}
        {...this.props.dragHandleProps}
      />
    );
  }
}

export default TaskHandler;
