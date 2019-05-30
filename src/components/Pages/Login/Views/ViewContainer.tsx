import React from "react";
import { Form } from "components/UI/PageComponents";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./ViewContainer.scss";

interface item {
  className?: string;
  onClick?: any;
  content?: any;
}

interface items extends Array<item> {}

interface Props {
  header: {
    title?: string;
    className?: string;
  };
  items?: items;
  className?: string;
  onSubmit?: any;
  submitBtnTitle?: string;
}

const ViewContainer = (props: Props & React.Props<{}>) => {
  const {
    header: { title: headerTitle, className: headerClassName },
    className,
    items = [],
    ref,
    ...formProps
  } = props;
  return (
    <div id="view-container" className={className}>
      <div id="inner-container">
        {headerTitle && (
          <div className={`header flex center ${headerClassName}`}>{headerTitle}</div>
        )}
        <Form {...formProps}>{props.children}</Form>
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
