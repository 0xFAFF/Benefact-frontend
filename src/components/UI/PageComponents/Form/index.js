import React from "react";
import { Button, AcceptCancelButtons } from "components/UI/PageComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Form extends React.Component {
  state = { form: {} };

  handlePressEnter = e => {
    if (e.key === "Enter") {
      this.submitForm();
    }
  };

  submitForm = () => {
    this.props.onSubmit(this.state.form);
  };

  render() {
    const {
      submitBtnTitle,
      cancelBtnTitle,
      items = [],
      className,
      onSubmit,
      onCancel
    } = this.props;
    return (
      <div id="form" className={className}>
        {items.map(({ name, placeholder, icon, type }) => (
          <div key={name} className="input-container">
            <div className="input-icon">
              <FontAwesomeIcon icon={icon} size="sm" />
            </div>
            <input
              className="input-field"
              id={name}
              name={name}
              placeholder={placeholder}
              value={this.state.form[name] || ""}
              type={type}
              onKeyPress={this.handlePressEnter}
              onChange={e =>
                this.setState({ form: { ...this.state.form, [name]: e.target.value } })
              }
            />
          </div>
        ))}
        {onSubmit && onCancel ? (
          <AcceptCancelButtons
            onAcceptHandler={onSubmit}
            onCancelHandler={onCancel}
            acceptTitle={submitBtnTitle}
            cancelTitle={cancelBtnTitle}
          />
        ) : onSubmit ? (
          <Button onClick={this.submitForm}>{submitBtnTitle}</Button>
        ) : null}
      </div>
    );
  }
}

export default Form;
