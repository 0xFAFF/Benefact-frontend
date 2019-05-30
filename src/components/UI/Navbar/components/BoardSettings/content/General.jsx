import React from "react";
import { Input, Form } from "components/UI/PageComponents";

export class General extends React.Component {
  state = {};

  componentDidMount() {
    const { defaultPrivilege, description, title } = this.props.general;
    this.setState({
      defaultPrivilege,
      description,
      title
    });
  }

  onSubmit = (form) => {
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} submitBtnTitle="Update" cancelBtnTitle="Cancel" onlyChanged>
        <Input icon="outdent" label="Title" name="title" defaultValue={this.state.title}/>
        <Input icon="newspaper" label="Description" name="description"/>
      </Form>
    );
  }
}
