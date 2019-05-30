import React, { RefObject } from "react";
import { Button, AcceptCancelButtons, Input } from "components/UI/PageComponents";
import "./Form.scss";

interface Props {
  submitBtnTitle?: string;
  cancelBtnTitle?: string;
  className?: string;
  onSubmit?: any;
  onCancel?: any;
  onlyChanged?: boolean;
}

export class Form extends React.Component<Props> {
  form = {} as { [s: string]: RefObject<HTMLInputElement> };
  state = {} as { [s: string]: boolean };

  handlePressEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      this.submitForm();
    }
  };

  submitForm = () => {
    if (!this.props.onSubmit) return;
    let entries = Object.entries(this.form);
    if (this.props.onlyChanged) entries = entries.filter(([key, _]) => this.state[key]);
    let form = {} as any;
    entries.map(([key, value]) => {
      form[key] = value.current && value.current.value;
    });
    this.props.onSubmit(form);
  };

  clearForm = () => {
    Object.entries(this.state).map(([key, _])=> delete this.state[key]);
    this.setState(this.state);
    Object.values(this.form).forEach(value => {
      if (value.current) value.current.value = value.current.defaultValue;
    });
  };

  render() {
    const { submitBtnTitle, cancelBtnTitle, className, onlyChanged } = this.props;
    this.form = {};
    return (
      <div id="form" className={className}>
        {React.Children.map(this.props.children, child => {
          if (!React.isValidElement(child)) return;
          const ref = React.createRef<HTMLInputElement>();
          const name = (child.props as any).name;
          this.form[name] = ref;
          return (
            <child.type
              {...child.props}
              ref={ref}
              onKeyPress={this.handlePressEnter}
              onChange={() => this.setState({ [name]: true })}
            />
          );
        })}
        {(!onlyChanged || Object.entries(this.state).length > 0) && (
          <AcceptCancelButtons
            onAcceptHandler={this.submitForm}
            onCancelHandler={this.clearForm}
            acceptTitle={submitBtnTitle}
            cancelTitle={cancelBtnTitle}
          />
        )}
      </div>
    );
  }
}

export default Form;
