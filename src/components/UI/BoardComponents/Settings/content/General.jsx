import React from "react";
import { Input, Form } from "components/UI/PageComponents";

export class General extends React.Component {
  onSubmit = form => {
    this.props.handleUpdate("boards", "UPDATE", form);
  };

  render() {
    const { title, description } = this.props.page.data;
    return (
      <Form
        className="section"
        onSubmit={this.onSubmit}
        submitBtnTitle="Update"
        cancelBtnTitle="Cancel"
        onlyChanged
        defaults={{ title, description }}
      >
        <Input icon="outdent" label="Title" id="title" />
        <Input icon="newspaper" label="Description" id="description" />
      </Form>
    );
  }
}
