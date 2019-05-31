import React from "react";
import { Input, Form, Button } from "components/UI/PageComponents";

export const Columns = props => {
  const {
    page: {
      data: { columns }
    }
  } = props;
  const submit = form => {};
  return columns.map(c => (
    <Form key={c.id} submitBtnTitle="Update" onlyChanged onSubmit={submit} cancelBtnTitle="Cancel">
      {inputProps => (
        <div className="row">
          <Input
            className="col grow-even"
            label="Title"
            name={`${c.id}.title`}
            {...inputProps(c.id)}
            defaultValue={c.title}
          />
          <div className="col grow-even">State</div>
          <div id="input-container" className="col grow-even">
            <label>Delete</label>
            <Button className="pull-left" icon="trash" />
          </div>
        </div>
      )}
    </Form>
  ));
};
