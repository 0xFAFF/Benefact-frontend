import React from "react";
import { Input, Form } from "components/UI/PageComponents";
import { PrivilegeInput } from "./PrivilegeInput";

export class Invite extends React.Component<any> {
  state = { currentLink: null };
  onSubmit = async (form: any) => {
    this.setState({ currentLink: await this.props.page.compFetch("boards", "INVITE", form) });
  };

  render() {
    return (
      <Form
        className="section"
        onSubmit={this.onSubmit}
        submitBtnTitle={!Boolean(this.state.currentLink) && "Create Link" || undefined}
        defaults={{ privilege: 1 }}
        onChange={() => this.setState({ currentLink: null })}
      >
        <PrivilegeInput label="Default Privilege" id="privilege" />
        {this.state.currentLink && <div>{this.state.currentLink}</div>}
      </Form>
    );
  }
}
