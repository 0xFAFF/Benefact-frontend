import React, { RefObject } from "react";
import { AcceptCancelButtons } from "components/UI/PageComponents";
import "./Form.scss";

interface Props {
  submitBtnTitle?: string;
  cancelBtnTitle?: string;
  keepAfterSubmit?: boolean;
  className?: string;
  onSubmit?(form: { [s: string]: any }): void;
  onCancel?: any;
  onChange?(form: { [s: string]: any }): void;
  onlyChanged?: boolean;
  values?: {};
  defaults?: { [s: string]: any };
}

export class Form extends React.Component<Props> {
  state = {} as { [s: string]: any };

  handlePressEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      this.submitForm();
    }
  };

  submitForm = async () => {
    if (this.props.onSubmit) await this.props.onSubmit(this.form());
    if (!this.props.keepAfterSubmit) {
      this.setState((prevState: { [s: string]: any }) => {
        return Object.entries(prevState).map(([key, _]) => delete prevState[key]);
      });
    }
  };

  cancelHandler = () => {
    this.setState((prevState: { [s: string]: any }) => {
      return Object.entries(prevState).map(([key, _]) => delete prevState[key]);
    });
    if (this.props.onCancel) this.props.onCancel();
  };

  form = (includeDefaults?: boolean) => {
    let form = { ...this.props.values, ...this.state };
    if (includeDefaults || !this.props.onlyChanged) form = { ...this.props.defaults, ...form };
    return form;
  };

  attach = (name: string) => {
    const onChange = (value: any) => {
      this.setState(
        { [name]: value },
        () => this.props.onChange && this.props.onChange(this.state)
      );
    };
    const defaults = this.props.defaults || {};
    let value = this.state[name];
    if (value === undefined) value = defaults[name];
    if (value === undefined) value = "";
    return { onChange, name, value };
  };

  render() {
    const { submitBtnTitle, cancelBtnTitle, className, onlyChanged } = this.props;
    return (
      <div id="form" className={className} onKeyPress={this.handlePressEnter}>
        {typeof this.props.children === "function" &&
          (this.props.children as any)({ attach: this.attach, value: this.form(true) })}
        {React.Children.map(this.props.children, child => {
          if (!React.isValidElement(child)) return;
          return <child.type {...child.props} {...this.attach((child.props as any).id)} />;
        })}
        {(!onlyChanged || Object.entries(this.state).length > 0) && (
          <AcceptCancelButtons
            onAcceptHandler={this.submitForm}
            onCancelHandler={this.cancelHandler}
            acceptTitle={submitBtnTitle}
            cancelTitle={cancelBtnTitle}
          />
        )}
      </div>
    );
  }
}

export default Form;
