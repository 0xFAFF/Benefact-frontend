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
    Object.entries(this.state).map(([key, _]) => delete this.state[key]);
    this.setState(this.state);
  };

  clearForm = () => {
    Object.entries(this.state).map(([key, _]) => delete this.state[key]);
    this.setState(this.state);
    Object.values(this.form).forEach(value => {
      if (value.current) value.current.value = value.current.defaultValue;
    });
  };

  input = (id: string) => {
    const ref = React.createRef<HTMLInputElement>();
    this.form[id] = ref;
    const onChange = () => !this.state[id] && this.setState({ [id]: true });
    return { ref, onChange };
  };

  render() {
    const { submitBtnTitle, cancelBtnTitle, className, onlyChanged } = this.props;
    this.form = {};
    return (
      <div id="form" className={className} onKeyPress={this.handlePressEnter}>
        {typeof this.props.children === "function" && (this.props.children as any)(this.input)}
        {React.Children.map(this.props.children, child => {
          if (!React.isValidElement(child)) return;
          return <child.type {...child.props} {...this.input((child.props as any).name)} />;
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
