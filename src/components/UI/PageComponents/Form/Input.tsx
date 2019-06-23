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
  enterBlur?: boolean;
}

export const Input = InputWrapper(
  class extends React.Component<Props> {
    inputRef = React.createRef<HTMLInputElement>();
    render = () => {
      const { icon, enterBlur, label, className, grow = true, onChange, ...rest } = this.props;
      let childProps = rest as any;
      if (childProps.type === "checkbox") {
        childProps.checked = childProps.value;
        delete childProps.value;
      } else if (childProps.value === null) childProps.value = "";
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
            onKeyPress={
              enterBlur &&
              (e => {
                if (this.inputRef.current && e.key === "Enter") this.inputRef.current.blur();
              })
            }
            ref={this.inputRef}
            onChange={e => {
              const newValue =
                onChange &&
                onChange(childProps.type === "checkbox" ? e.target.checked : e.target.value);
              if (newValue !== undefined && newValue !== null) {
                e.target.value = newValue;
              }
            }}
            {...childProps}
          />
        </div>
      );
    };
  }
);

export default Input;
