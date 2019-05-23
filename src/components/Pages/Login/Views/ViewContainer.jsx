import React from "react";
import { Button } from "components/UI/PageComponents";
import "./ViewContainer.scss";

class ViewContainer extends React.Component {
  render() {
    const {
      children,
      header: { title: headerTitle, className: headerClassName },
      button: { onClick, title: btnTitle },
      items = [],
      className,
      handleKeyPress
    } = this.props;

    return (
      <div id="view-container" className={className}>
        <div id="inner-container" onKeyPress={handleKeyPress}>
          {headerTitle && (
            <div className={`header flex center ${headerClassName}`}>{headerTitle}</div>
          )}
          {children}
          <Button onClick={onClick}>{btnTitle}</Button>
        </div>
        <div id="bottom-container" className="flex center">
          {items.map(({ className = "", onClick = () => {}, content }, index) => (
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
