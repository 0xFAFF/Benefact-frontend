import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextAreaInput } from "components/UI";
import { AddCard } from "components/UI/AddComponents";

const Header = props => {
  const { dragHandleProps, column, updateBoardContent, page, cardCount } = props;
  const { showModal, closeModal, hasPrivilege } = page;
  const { title, allowContribution } = column;
  return (
    <div className="column-header" {...dragHandleProps}>
      <span className="title">
        <div className="card-number">({cardCount})</div>
        {hasPrivilege("admin") ? (
          <TextAreaInput
            name="Title"
            defaultValue={title}
            onBlur={e => {
              if (e.target.value !== title) {
                updateBoardContent(
                  {
                    id: column.id,
                    title: e.target.value
                  },
                  "columns"
                );
              }
            }}
          />
        ) : (
          title
        )}
      </span>
      {hasPrivilege("developer") ||
        (hasPrivilege("contribute") && allowContribution && (
          <div
            className="add-card"
            onClick={() => {
              showModal(<AddCard onClose={closeModal} columnId={column.id} {...props} />);
            }}
          >
            <FontAwesomeIcon icon="plus" size="sm" />
          </div>
        ))}
    </div>
  );
};

Header.propTypes = {
  dragHandleProps: PropTypes.object,
  title: PropTypes.string,
  updateBoardContent: PropTypes.func
};

export default Header;
