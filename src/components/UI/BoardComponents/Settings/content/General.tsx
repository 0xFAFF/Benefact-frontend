import React from "react";
import { Input, Form } from "components/UI/PageComponents";
import { PrivilegeInput } from "./PrivilegeInput";

export class General extends React.Component<any> {
  onSubmit = async (form: any) => {
    await this.props.handleUpdate("boards", "UPDATE", form);
  };

  render() {
    const { title, description, defaultPrivilege } = this.props.page.data;
    return (
      <Form
        className="section"
        onSubmit={this.onSubmit}
        submitBtnTitle="Update"
        cancelBtnTitle="Cancel"
        onlyChanged
        defaults={{ title, description, defaultPrivilege }}
      >
        <Input icon="outdent" label="Title" id="title" />
        <Input icon="newspaper" label="Description" id="description" />
        <PrivilegeInput label="Default Privilege" id="defaultPrivilege" />
      </Form>
    );
  }
}
