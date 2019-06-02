import React from "react";
import { SelectProps, StyledSelect } from "components/UI/PageComponents/Form/StyledSelect";

export const PrivilegeInput = (props: SelectProps) => {
  return (
    <StyledSelect
      options={[
        { value: 0, title: "None" },
        { value: 1, title: "Read" },
        { value: 7, title: "Contribute" },
        { value: 127, title: "Developer" },
        { value: 255, title: "Admin" }
      ]}
      {...props}
    />
  );
};
