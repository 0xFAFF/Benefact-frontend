import React from "react";
import { Button, AcceptCancelButtons, Input } from "components/UI/PageComponents";
import "./index.scss";

interface Props {
  submitBtnTitle?: string;
  cancelBtnTitle?: string;
  items: Array<{ name: string }>;
  className?: string;
  onSubmit?: any;
  onCancel?: void;
}

interface State {
  form: any;
}

export class Form extends React.Component<Props, State> {
  handlePressEnter = (e: React.KeyboardEvent) => {
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
            onChange={(e: any) =>
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
