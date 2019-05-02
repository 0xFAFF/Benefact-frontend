import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextAreaInput } from "components/UI";
import { PageConsumer } from "components/Pages/PageContext";
import { AddCard } from "components/UI/AddComponents";

const Header = props => {
  const { dragHandleProps, title, updateBoardContent, ...rest } = props;
  const { cardCount, columnId } = rest;
  return (
    <div className="column-header" {...dragHandleProps}>
      <span className="title">
        <div className="card-number">({cardCount})</div>
        <TextAreaInput
          name="Title"
          defaultValue={title}
          onBlur={e => {
            if (e.target.value !== title) {
              updateBoardContent(
                {
                  id: columnId,
                  title: e.target.value
                },
                "columns"
              );
            }
          }}
        />
      </span>
      <PageConsumer>
        {page => {
          const { showModal, closeModal } = page;
          return (
            <div
              className="add-card"
              onClick={() => {
                showModal(<AddCard onClose={closeModal} {...rest} />);
              }}
            >
              <FontAwesomeIcon icon="plus" size="sm" />
            </div>
          );
        }}
      </PageConsumer>
    </div>
  );
};

Header.propTypes = {
  dragHandleProps: PropTypes.object,
  title: PropTypes.string,
  updateBoardContent: PropTypes.func
};

export default Header;
