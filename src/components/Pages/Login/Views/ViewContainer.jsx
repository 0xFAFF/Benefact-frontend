import React from "react";
import { Button } from "components/UI/PageComponents";
import "./ViewContainer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ViewContainer extends React.Component {
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
      children,
      header: { title: headerTitle, className: headerClassName },
      buttonTitle,
      formItems = [],
      items = [],
      className
    } = this.props;

    return (
      <div id="view-container" className={className}>
        <div id="inner-container">
          {headerTitle && (
            <div className={`header flex center ${headerClassName}`}>{headerTitle}</div>
          )}
          {formItems.map(({ name, placeholder, icon, type }) => (
            <div className="input-container">
              <div className="input-icon">
                <FontAwesomeIcon icon={icon} size="sm" />
              </div>
              <input
                className="input-field"
                id={name}
                name={name}
                placeholder={placeholder}
                value={this.state.form[name]}
                type={type}
                onKeyPress={this.handlePressEnter}
                onChange={e =>
                  this.setState({ form: { ...this.state.form, [name]: e.target.value } })
                }
              />
            </div>
          ))}
          {children}
          <Button onClick={this.submitForm}>{buttonTitle}</Button>
        </div>
        <div id="bottom-container" className="flex center">
          {items.map(({ className = "", onClick, content }, index) => (
            <div key={index} className={className} onClick={onClick}>
              {content}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ViewContainer;
