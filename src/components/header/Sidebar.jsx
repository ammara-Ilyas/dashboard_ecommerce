"use client";
import { useSidebar } from "@/contextApi/SidebarContext";
import { List, ListItem, ListItemText } from "@mui/material";
// import { NestedList } from "./miniComponents/NestedList";
const Sidebar = () => {
  const menuItems = [
    "Dashboard",
    "Home Banner Slides",
    "Category",
    "Products",
    "Orders",
    "Home Banners",
    "Home Side Banners",
    "Home Bottom Banners",
  ];
  const { isSidebarOpen } = useSidebar();
  console.log("Sidebar open state:", isSidebarOpen);

  return (
    <div
      className={`bg-white w-60 h-[90vh] fixed top-20 left-0 shadow-md  dark:bg-gray-900 dark:text-gray-300
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button={true}
            key={item}
            className="hover:bg-gray-200 cursor-pointer"
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      {/* <NestedList /> */}
    </div>
  );
};

export default Sidebar;
