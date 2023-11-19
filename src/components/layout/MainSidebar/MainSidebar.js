import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Col } from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";

import { Store } from "../../../flux";

const MainSidebar = ({ hideLogoText }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [sidebarNavItems, setSidebarNavItems] = useState(
    Store.getSidebarItems()
  );

  useLayoutEffect(() => {
    Store.addChangeListener(onChange);
  }, []);

  useEffect(() => {
    return () => Store.removeChangeListener(onChange);
  }, []);

  const onChange = () => {
    setMenuVisible(Store.getMenuState());
    setSidebarNavItems(Store.getSidebarItems());
  };

  const classes = classNames(
    "main-sidebar",
    "px-0",
    "col-12",
    menuVisible && "open"
  );

  return (
    <Col tag="aside" className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <SidebarMainNavbar hideLogoText={hideLogoText} />
      <SidebarSearch />
      <SidebarNavItems />
    </Col>
  );
};

MainSidebar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

MainSidebar.defaultProps = {
  hideLogoText: false
};

export default MainSidebar;
