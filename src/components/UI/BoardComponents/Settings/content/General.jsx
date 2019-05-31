import React from "react";
import { Input, Form } from "components/UI/PageComponents";

export class General extends React.Component {
  onSubmit = form => {
    this.props.handleUpdate("boards", "UPDATE", form);
  };

  render() {
    const { title, description } = this.props.page.data;
    return (
      <Form onSubmit={this.onSubmit} submitBtnTitle="Update" cancelBtnTitle="Cancel" onlyChanged>
        <Input icon="outdent" label="Title" id="title" defaultValue={title} />
        <Input icon="newspaper" label="Description" id="description" defaultValue={description} />
      </Form>
    );
  }
}
