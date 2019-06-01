import React from "react";
import { Input, Form, Button, StyledSelect } from "components/UI/PageComponents";

export class Columns extends React.Component<any> {
  state = {
    addColumn: false
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
      console.log(form);
      handleUpdate("columns", "UPDATE", form);
    };
    const columnInputs = (id: string, inputProps: any) => (
      <>
        <Input
          id={`${id}.title`}
          className="col grow-even"
          label="Title"
          {...inputProps("title")}
        />
        <StyledSelect
          id={`${id}.state`}
          label="State"
          {...inputProps("state")}
          className="col grow-even"
          options={[
            { value: 0, title: "Open" },
            { value: 1, title: "Active" },
            { value: 2, title: "Done" },
            { value: 3, title: "Cancelled" }
          ]}
        />
        <Input
          id={`${id}.contrib`}
          className="col grow-even"
          label="Contributors?"
          type="checkbox"
          {...inputProps("allowContribution")}
        />
      </>
    );
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
              <div className="section row">
                {columnInputs(c.id, inputProps)}
                <div className="input-container col grow-even">
                  <label>Delete</label>
                  <Button
                    className="pull-left sm"
                    icon="trash"
                    onClick={() => this.props.handleUpdate("columns", "DELETE", { id: c.id })}
                  />
                </div>
              </div>
            )}
          </Form>
        ))}
        {!this.state.addColumn ? (
          <div className="add-column">
            <Button className="grow" onClick={() => this.setState({ addColumn: true })}>
              Add Column
            </Button>
          </div>
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
              <div className="section row">{columnInputs("add", inputProps)}</div>
            )}
          </Form>
        )}
      </>
    );
  };
}
