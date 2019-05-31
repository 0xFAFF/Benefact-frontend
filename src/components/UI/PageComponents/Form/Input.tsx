import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { InputWrapper, InputProps, InputComponent } from "./InputWrapper";
import "./Form.scss";

interface Props extends InputProps {
  id?: string;
  grow?: boolean;
  icon?: IconProp;
  placeholder?: string;
  type?: string;
  onKeyPress?(e: React.KeyboardEvent): void;
}

export const Input = InputWrapper(class extends React.Component<Props> implements InputComponent {
  ref = React.createRef<HTMLInputElement>();
  value = () => {
    const input = this.ref.current;
    return input && (input.type ==="checkbox" ? input.checked : input.value);
  }
  reset = () => {
    const input = this.ref.current;
    if(!input) return;
    if(input.type === "checkbox") input.checked = input.defaultChecked;
    else input.value = input.defaultValue;
  }
  render = () => {
    const { icon, label, className, grow = true, ...rest } = this.props;
    let childProps = rest as any;
    if (childProps.type === "checkbox") {
      childProps.defaultChecked = childProps.defaultValue;
      delete childProps.defaultValue;
    }
    return (
      <div className="row">
        {icon && (
          <div className="input-icon">
            <FontAwesomeIcon icon={icon} size="sm" />
          </div>
        )}
        <input
          ref={this.ref}
          className={`input-field ${(grow && "grow") || ""}`}
          id={childProps.id}
          {...childProps}
        />
      </div>
    );
  };
});

export default Input;
