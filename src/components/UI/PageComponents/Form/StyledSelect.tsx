import React, { RefObject } from "react";
import "./StyledSelect.scss";

interface SelectOption {
  id: string;
  title: string;
}

interface Props {
  id?: string;
  disabled?: boolean;
  options?: Array<SelectOption>;
  onChangeHandler?: (newValue: SelectOption) => void;
  defaultValue?: string;
  className?: string;
  label?: string;
  ref?: RefObject<HTMLSelectElement>;
  onChange?(e: React.SyntheticEvent): void;
}

export const StyledSelect = React.forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const { id, disabled, onChangeHandler, options = [] } = props;
  const { label, className, onChange, defaultValue } = props;
  const result = (
    <div id="input-container" className={className || "col"}>
      {label && <label htmlFor={id}>{label}</label>}
      {!disabled ? (
        <select
          id={id}
          defaultValue={defaultValue}
          className="styled-select editable"
          ref={ref}
          onChange={e => {
            // Derpy hack to get defaultValue on the ref's target
            (e.target as any).defaultValue = defaultValue;
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
      )}
    </div>
  );

  return result;
});
