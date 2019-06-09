import React from "react";
import { SelectProps, StyledSelect } from "components/UI/PageComponents/Form/StyledSelect";

export const Privileges = [
  { value: 0, title: "None" },
  { value: 1, title: "Read" },
  { value: 7, title: "Contribute" },
  { value: 127, title: "Developer" },
  { value: 255, title: "Admin" }
];
export const PrivilegeMap = Privileges.reduce(
  (map, p) => {
    map[p.value] = p.title;
    return map;
  },
  {} as { [i: number]: string }
);

export const PrivilegeInput = (props: SelectProps) => {
  return <StyledSelect options={Privileges} {...props} />;
};

export default PrivilegeInput;
