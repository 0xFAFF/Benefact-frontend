import React from "react";
import { Input, Form, Button, StyledSelect, ButtonGroup } from "components/UI/PageComponents";
import { notifyToast } from "utils";
import "./Columns.scss";

export class Columns extends React.Component<any> {
  state = {
    addColumn: false
  };
  columnInputs = (id: number | string, inputProps: any) => {
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
            { value: 2, title: "Cancelled" },
            { value: 3, title: "Done" }
          ]}
        />
        <div className="grow row center wrap">
          <Input
            id={`${id}.contrib`}
            className="col"
            label="Contributors?"
            type="checkbox"
            {...inputProps("allowContribution")}
          />
          {id !== "add" && (
            <div className="input-container col">
              <label>Delete</label>
              <Button
                className="sm"
                icon="trash"
                onClick={() => this.props.handleUpdate("columns", "DELETE", { id })}
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
    const submit = async (form: any) => {
      if (form.state) form.state = Number.parseInt(form.state);
      await handleUpdate("columns", "UPDATE", form).then((_: any) => {
        notifyToast("success", "Updated board columns", { autoClose: 2000 });
      });
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
              <div className="section row wrap">{this.columnInputs("add", inputProps)}</div>
            )}
          </Form>
        )}
      </>
    );
  };
}
