import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as COLORS } from "constants/COLORS";
import { InputWrapper, InputProps } from "components/UI/PageComponents/Form/InputWrapper";

export const ColorOptions = InputWrapper(
  class extends React.Component<InputProps> {
    render = () => {
      let colorsList = COLORS();
      return (
        <ul className="create-tag-input-color-ul">
          {Object.values(colorsList).map(color => {
            return (
              <li
                key={color}
                style={{ backgroundColor: color }}
                className="create-tag-input-color-tag"
                onClick={() => this.props.onChange && this.props.onChange(color)}
              >
                {color === this.props.value ? (
                  <div className="create-tag-input-color-tag-selected">
                    <FontAwesomeIcon icon="check" size="sm" />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      );
    };
  }
);

export default ColorOptions;
