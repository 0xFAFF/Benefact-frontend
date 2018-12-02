import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddCategory extends React.Component {
  render() {
    return (
      <div className="add-category">
        <FontAwesomeIcon
          icon="plus"
          size="sm"
          //   onClick={() => this.toggleMenu(false)}
        />
      </div>
    );
  }
}

export default AddCategory;
