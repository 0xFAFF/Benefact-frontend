import React from "react";
import DisplayTag from "components/UI/BoardComponents/Tags/DisplayTag";
import { Button } from "components/UI/PageComponents";

export const Tags = props => {
  return (
    <div className="tags-list center">
      {props.page.data.tags.map(tag => {
        return (
          <div className="section row">
            <DisplayTag tag={tag} className="lg" />
            <Button className="grow">Edit</Button>
            <Button className="pull-right" icon="trash" />
          </div>
        );
      })}
    </div>
  );
};
