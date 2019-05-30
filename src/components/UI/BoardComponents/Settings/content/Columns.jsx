import React from "react";
import { Input } from "components/UI/PageComponents";

export const Columns = props => {
  const {
    page: {
      data: { columns }
    }
  } = props;
  return (
    <div id="input-container">
      {columns.map(c => (
        <div className="row">
          <div className="col grow-even">
            <Input label="Title" name={c.id} />
          </div>
          <div className="col grow-even">State</div>
          <div className="col grow-even">Add/delete column</div>
        </div>
      ))}
    </div>
  );
};
