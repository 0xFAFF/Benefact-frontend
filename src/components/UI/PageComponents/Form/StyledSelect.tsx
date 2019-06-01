import React, { RefObject } from "react";
import "./StyledSelect.scss";
import { InputWrapper, InputProps } from "components/UI/PageComponents/Form/InputWrapper";

interface SelectOption {
  id: string;
  title: string;
}

interface Props extends InputProps {
  id?: string;
  disabled?: boolean;
  options?: Array<SelectOption>;
  onChangeHandler?: (newValue: SelectOption) => void;
  className?: string;
  label?: string;
  ref?: RefObject<HTMLSelectElement>;
  onChange?(e: React.SyntheticEvent): void;
}

export const StyledSelect = InputWrapper(
  class extends React.Component<Props> {
    value() {
      return this.ref.current && this.ref.current.value;
    }
    reset() {
      this.ref.current && (this.ref.current.value = this.defaultValue);
    }
    ref = React.createRef<HTMLSelectElement>();
    defaultValue: string = "";
    render = () => {
      const { id, disabled, onChangeHandler, options = [] } = this.props;
      const { onChange, defaultValue = "" } = this.props;
      this.defaultValue = defaultValue;
      const result = !disabled ? (
        <select
          id={id}
          defaultValue={defaultValue}
          className="styled-select editable"
          ref={this.ref}
          onChange={e => {
            onChange && onChange(e);
            onChangeHandler &&
              onChangeHandler(options.find(o => String(o.id) === e.target.value) || options[0]);
          }}
        >
          {options.map(option => {
            return (
              <option key={option.id} value={option.id}>
                {option.title}
              </option>
            );
          })}
        </select>
      ) : (
        <div className="styled-select">
          {(options.find(o => o.id === defaultValue) || options[0]).title}
        </div>
      );
      return result;
    };
  }
);
