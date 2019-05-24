import React from "react";
import { Form } from "components/UI/PageComponents";
import "./ViewContainer.scss";

const ViewContainer = props => {
  const {
    header: { title: headerTitle, className: headerClassName },
    formItems = [],
    items = [],
    className,
    ...formProps
  } = props;
  return (
    <div id="view-container" className={className}>
      <div id="inner-container">
        {headerTitle && (
          <div className={`header flex center ${headerClassName}`}>{headerTitle}</div>
        )}
        <Form items={formItems} {...formProps} />
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
};

export default ViewContainer;
