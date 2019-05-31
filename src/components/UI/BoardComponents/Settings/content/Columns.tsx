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
    >
      {(inputProps: any) => (
        <div className="row">
          <Input
            id={`${c.id}.title`}
            className="col grow-even"
            label="Title"
            {...inputProps("title")}
            defaultValue={c.title}
          />
          <StyledSelect
            id={`${c.id}.state`}
            label="State"
            {...inputProps("state")}
            className="col grow-even"
            defaultValue={c.state}
            options={[
              { id: "0", title: "Open" },
              { id: "1", title: "Active" },
              { id: "2", title: "Done" },
              { id: "3", title: "Cancelled" }
            ]}
          />
          <div id="input-container" className="col grow-even">
            <label>Delete</label>
            <Button className="pull-left" icon="trash" />
          </div>
        </div>
      )}
    </Form>
  ));
};
