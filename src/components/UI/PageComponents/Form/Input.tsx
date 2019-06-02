import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { InputWrapper, InputProps } from "./InputWrapper";
import "./Form.scss";

interface Props extends InputProps {
  id?: string;
  grow?: boolean;
  icon?: IconProp;
  placeholder?: string;
  type?: string;
  onKeyPress?(e: React.KeyboardEvent): void;
}

export const Input = InputWrapper(
  class extends React.Component<Props> {
    render = () => {
      const { icon, label, className, grow = true, onChange, ...rest } = this.props;
      let childProps = rest as any;
      if (childProps.type === "checkbox") {
        childProps.checked = childProps.value;
        delete childProps.value;
      }
      return (
        <div className="row grow center">
          {icon && (
            <div className="input-icon">
              <FontAwesomeIcon icon={icon} size="sm" />
            </div>
          )}
          <input
            className={`input-field ${(grow && "grow") || ""}`}
            id={childProps.id}
            onChange={e =>
              onChange &&
              onChange(childProps.type === "checkbox" ? e.target.checked : e.target.value)
            }
            {...childProps}
          />
        </div>
      );
    };
  }
);

export default Input;
