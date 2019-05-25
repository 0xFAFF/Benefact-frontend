import React from "react";
import PropTypes from "prop-types";
import { Button, AcceptCancelButtons, Input } from "components/UI/PageComponents";
import "./index.scss";

export class Form extends React.Component {
  static propTypes = {
    submitBtnTitle: PropTypes.string,
    cancelBtnTitle: PropTypes.string,
    items: PropTypes.array,
    className: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
  };

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
        {items.map(inputProps => (
          <Input
            key={inputProps.name}
            {...inputProps}
            value={this.state.form[inputProps.name] || ""}
            onKeyPress={this.handlePressEnter}
            onChange={e =>
              this.setState({ form: { ...this.state.form, [inputProps.name]: e.target.value } })
            }
          />
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
