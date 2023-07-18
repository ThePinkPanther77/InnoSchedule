import React from "react";
import { Menu } from "antd";
import { Event } from "./utils/EventInteerface";
import { itemsMenu } from "./utils/ItemMenu";
import { SelectedItemInterface } from "./utils/SelectedItemItnerface";
import { Filtering } from "./utils/FilteringInterface";

interface SelectedItem {
  key: string;
  keyPath: string[];
}

interface SideBarProps {
  events: Event[];
  setFilterEvents: (filterEvents: Event[]) => void;
  setFiltering: (filtering: Filtering) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  events,
  setFilterEvents,
  setFiltering,
}) => {
  const handleMenuClick = (selected: SelectedItemInterface) => {
    const selectedItem = selected.key;
    const selectedSubMenu = selected.keyPath[1];
    if (selectedSubMenu === "courses") {
      setFiltering({ type: "courses", value: selectedItem });
      setFilterEvents(
        events.filter((event) => event.extendedProps.course === selectedItem)
      );
    } else if (selectedSubMenu === "groups") {
      setFiltering({ type: "groups", value: selectedItem });
      setFilterEvents(
        events.filter((event) =>
          event.extendedProps.group
            ? event.extendedProps.group === selectedItem
            : event
        )
      );
    }
  };
  return (
    <Menu mode="inline" onClick={handleMenuClick}>
      {itemsMenu.map((item) => (
        <Menu.SubMenu key={item.key} title={item.label}>
          {item.children.map((child) => (
            <Menu.Item key={child.key}>{child.label}</Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );
};

export default SideBar;
