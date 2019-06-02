import React, { RefObject } from "react";
import "./StyledSelect.scss";
import { InputWrapper, InputProps } from "components/UI/PageComponents/Form/InputWrapper";

interface SelectOption {
  title: string;
  value: any;
}

export interface SelectProps extends InputProps {
  id?: string;
  disabled?: boolean;
  options?: Array<SelectOption>;
  className?: string;
  label?: string;
  ref?: RefObject<HTMLSelectElement>;
}

export const StyledSelect = InputWrapper(
  class extends React.Component<SelectProps> {
    render = () => {
      const { id, disabled, options = [] } = this.props;
      const { onChange, value } = this.props;
      const option0 = options[0] || {};
      const result = !disabled ? (
        <select
          id={id}
          className="styled-select editable"
          value={(options.find(o => o.value === value) || option0).value}
          onChange={e => {
            const value = options.find(o => String(o.value) === e.target.value) || option0;
            onChange && onChange(value.value);
          }}
        >
          {options.map(option => {
            return (
              <option
                key={option.value}
                value={String(option.value)}
              >
                {option.title}
              </option>
            );
          })}
        </select>
      ) : (
        <div className="styled-select">
          {(options.find(o => o.value === value) || options[0]).title}
        </div>
      );
      return result;
    };
  }
);
