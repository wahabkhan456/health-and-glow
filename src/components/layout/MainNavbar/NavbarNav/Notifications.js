import React, { useState } from "react";
import { NavItem, NavLink } from "shards-react";

const Notifications = () => {
  const [visible, setVisible] = useState(false);

  const toggleNotifications = () => {
    setVisible(!visible);
  };

  return (
    <NavItem className="border-right dropdown notifications">
      <NavLink
        className="nav-link-icon text-center"
        onClick={toggleNotifications}
      >
        <div className="nav-link-icon__wrapper">
          <i className="material-icons">&#xf217;</i>
        </div>
      </NavLink>
    </NavItem>
  );
};

export default Notifications;
