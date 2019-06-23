import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddCard } from "components/UI/AddComponents";
import { Input } from "components/UI/PageComponents";

const Header = props => {
  const { dragHandleProps, column, updateBoardContent, page, cardCount } = props;
  const { showModal, closeModal, hasPrivilege } = page;
  const { title, allowContribution } = column;
  return (
    <div className="column-header" {...dragHandleProps}>
      <div>({cardCount})</div>
      <span className="title">
        {hasPrivilege("admin") ? (
          <Input
            name="Title"
            defaultValue={title}
            enterBlur
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
      {(hasPrivilege("developer") || (hasPrivilege("contribute") && allowContribution)) && (
        <div
          className="add-card"
          onClick={() => {
            showModal(
              <AddCard
                onClose={closeModal}
                content={{ columnId: column.id }}
                {...props}
                roles={page.data.roles}
              />
            );
          }}
        >
          <FontAwesomeIcon icon="plus" size="sm" />
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  dragHandleProps: PropTypes.object,
  title: PropTypes.string,
  updateBoardContent: PropTypes.func
};

export default Header;
