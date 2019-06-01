import React from "react";
import { Input, Form, Button, StyledSelect } from "components/UI/PageComponents";

export const Columns = (props: any) => {
  const {
    handleUpdate,
    page: {
      data: { columns }
    }
  } = props;
  const submit = (form: any) => {
    if (form.state) form.state = Number.parseInt(form.state);
    console.log(form);
    handleUpdate("columns", "UPDATE", form);
  };
  return columns.map((c: any) => (
    <Form
      values={{ id: c.id }}
      key={c.id}
      submitBtnTitle="Update"
      onlyChanged
      onSubmit={submit}
      cancelBtnTitle="Cancel"
      className="section"
      defaults={c}
    >
      {({ attach: inputProps }: { attach: any }) => (
        <div className="row">
          <Input
            id={`${c.id}.title`}
            className="col grow-even"
            label="Title"
            {...inputProps("title")}
          />
          <StyledSelect
            id={`${c.id}.state`}
            label="State"
            {...inputProps("state")}
            className="col grow-even"
            options={[
              { id: "0", title: "Open" },
              { id: "1", title: "Active" },
              { id: "2", title: "Done" },
              { id: "3", title: "Cancelled" }
            ]}
          />
          <Input
            id={`${c.id}.contrib`}
            className="col grow-even"
            label="Contributors?"
            type="checkbox"
            {...inputProps("allowContribution")}
          />
          <div id="input-container" className="col grow-even">
            <label>Delete</label>
            <Button
              className="pull-left sm"
              icon="trash"
              onClick={() => props.handleUpdate("columns", "DELETE", { id: c.id })}
            />
          </div>
        </div>
      )}
    </Form>
  ));
};
