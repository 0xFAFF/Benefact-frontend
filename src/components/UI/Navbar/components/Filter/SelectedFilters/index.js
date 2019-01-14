import React from "react";
import TagWrapper from "../TagWrapper";
import DisplayTag from "../../../../BoardComponents/Tags/DisplayTag";
import "./index.scss";

const SelectedFilters = props => {
  const { tags, columnId } = props;

  const NoFiltersMessage = () => {
    return <div>No Card Filters Currently Selected</div>;
  };
  const filtersSelected = tags.length > 0 || columnId !== "" ? true : false;
  //   return filtersSelected ? <TagWrapper tags={tags} /> : <NoFiltersMessage />;
  return filtersSelected ? (
    <div id="selected-filters">
      <ul className="tags-ul">
        {tags.map(tag => (
          <DisplayTag tag={tag} key={tag.id} />
        ))}
      </ul>
    </div>
  ) : (
    <NoFiltersMessage />
  );
};

export default SelectedFilters;
