import React, { useLayoutEffect, useEffect, useState } from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";

const SidebarNavItems = () => {
  const [navItems, setNavItems] = useState(Store.getSidebarItems());

  useLayoutEffect(() => {
    Store.addChangeListener(onChange);
  }, []);

  useEffect(() => {
    return () => Store.removeChangeListener(onChange);
  }, []);

  const onChange = () => {
    setNavItems(Store.getSidebarItems());
  };

  return (
    <div className="nav-wrapper">
      <Nav className="nav--no-borders flex-column">
        {navItems.map((item, idx) => (
          <SidebarNavItem key={idx} item={item} />
        ))}
      </Nav>
    </div>
  );
};

export default SidebarNavItems;
