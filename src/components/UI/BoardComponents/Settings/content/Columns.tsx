import React from "react";
import { Input, Form, Button, StyledSelect, ButtonGroup } from "components/UI/PageComponents";
import "./Columns.scss";

export class Columns extends React.Component<any> {
  state = {
    addColumn: false
  };
  columnInputs = (col: any, inputProps: any) => {
    const id = (col && col.id) || "add";
    return (
      <>
        <Input
          id={`${id}.title`}
          className="col title-input"
          label="Title"
          {...inputProps("title")}
        />
        <StyledSelect
          id={`${id}.state`}
          label="State"
          {...inputProps("state")}
          className="col grow"
          options={[
            { value: 0, title: "Open" },
            { value: 1, title: "Active" },
            { value: 2, title: "Done" },
            { value: 3, title: "Cancelled" }
          ]}
        />
        <div className="grow row">
          <Input
            id={`${id}.contrib`}
            className="col"
            label="Contributors?"
            type="checkbox"
            {...inputProps("allowContribution")}
          />
          {col && (
            <div className="input-container col">
              <label>Delete</label>
              <Button
                className="pull-left sm"
                icon="trash"
                onClick={() => this.props.handleUpdate("columns", "DELETE", { id: col.id })}
              />
            </div>
          )}
        </div>
      </>
    );
  };
  render = () => {
    const {
      handleUpdate,
      page: {
        data: { columns }
      }
    } = this.props;
    const submit = (form: any) => {
      if (form.state) form.state = Number.parseInt(form.state);
      handleUpdate("columns", "UPDATE", form);
    };
    return (
      <>
        {columns.map((c: any) => (
          <Form
            values={{ id: c.id }}
            key={c.id}
            submitBtnTitle="Update"
            onlyChanged
            onSubmit={submit}
            cancelBtnTitle="Cancel"
            defaults={c}
          >
            {({ attach: inputProps }: { attach: any }) => (
              <div className="section row wrap">{this.columnInputs(c.id, inputProps)}</div>
            )}
          </Form>
        ))}
        {!this.state.addColumn ? (
          <ButtonGroup>
            <Button onClick={() => this.setState({ addColumn: true })}>Add Column</Button>
          </ButtonGroup>
        ) : (
          <Form
            submitBtnTitle="Add"
            cancelBtnTitle="Cancel"
            defaults={{ title: "", allowContribution: false, state: 0 }}
            onCancel={() => this.setState({ addColumn: false })}
            onSubmit={form => {
              this.props
                .handleUpdate("columns", "ADD", form)
                .then(this.setState({ addColumn: false }));
            }}
          >
            {({ attach: inputProps }: { attach: any }) => (
              <div className="section row">{this.columnInputs("add", inputProps)}</div>
            )}
          </Form>
        )}
      </>
    );
  };
}
