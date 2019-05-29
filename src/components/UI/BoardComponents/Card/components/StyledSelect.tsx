import React from "react";
import "./StyledSelect.scss";

interface SelectOption {
  id: string;
  title: string;
}

interface Props {
  editable: boolean;
  options: Array<SelectOption>;
  onChangeHandler?: (newValue: SelectOption) => void;
  selectedId: string;
}

class StyledSelect extends React.Component<Props> {
  render = () => {
    const { editable, onChangeHandler, options, selectedId } = this.props;
    return (
      <div className={`styled-select background-color ${editable && "editable"}`}>
        {editable ? (
          <select
            onChange={e =>
              onChangeHandler &&
              onChangeHandler(options.find(o => String(o.id) === e.target.value) || options[0])
            }
            value={selectedId}
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
          <div>{(options.find(o => o.id === selectedId) || options[0]).title}</div>
        )}
      </div>
    );
  };
}

export default StyledSelect;
