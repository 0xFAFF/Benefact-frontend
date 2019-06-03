import React from "react";
import { Input, Form } from "components/UI/PageComponents";
import { PrivilegeInput } from "./PrivilegeInput";
import { notifyToast } from "utils";

export class General extends React.Component<any> {
  onSubmit = async (form: any) => {
    await this.props.handleUpdate("boards", "UPDATE", form).then((_: any) => {
      notifyToast("success", "Updated board", { autoClose: 2000 });
    });
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
