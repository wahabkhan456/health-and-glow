import React from "react";
import PropTypes from "prop-types";

const SidebarNavItem = ({ item }) => {
  const handleClick = e => {
    e.preventDefault();
  };
  return (
    <ul className="nav--no-borders flex-column nav">
      <li onClick={handleClick} style={{ padding: "0 5px", cursor: "pointer" }}>
        {item.htmlBefore && (
          <div
            className="d-inline-block item-icon-wrapper p-3"
            dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
          />
        )}
        {item.title && <span>{item.title}</span>}
        {item.htmlAfter && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
          />
        )}
      </li>
    </ul>
  );
};

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
