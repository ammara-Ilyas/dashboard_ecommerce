"use client";

import React, { useState } from "react";
import Link from "next/link";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { MdDashboard, MdLogout, MdCategory } from "react-icons/md";
import { useSidebar } from "@/contextApi/SidebarContext";

const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      className={`w-[270px] h-[85vh] fixed bottom-0 left-0  shadow-lg flex flex-col justify-between ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300`}
    >
      {/* Sidebar menu */}
      <div className="p-4">
        <ul className="space-y-2">
          <Link href="/">
            <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700">
              <MdDashboard className="text-xl" />
              <span>Dashboard</span>
            </li>
          </Link>

          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            className="rounded-lg"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              <Typography className="text-gray-700 dark:text-gray-300 flex items-center">
                <MdCategory className="text-xl mr-2" />
                Categories
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul className="ml-4 space-y-4">
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  <Link href="category/categorylist">Category List</Link>
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  <Link href="category/categoryadd"> Add a Category </Link>
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  <Link href="category/subCategoryList">
                    Sub Category List{" "}
                  </Link>
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  <Link href="category/subCategoryAdd">
                    Add a Sub Category{" "}
                  </Link>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>

          {/* Accordion Menu for Products */}
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            className="rounded-lg"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              className="hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              <Typography className="text-gray-700 dark:text-gray-300 flex items-center">
                <MdCategory className="text-xl mr-2" />
                Products
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul className="ml-4 space-y-4">
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Product List
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Add a Product
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Manage RAM
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Manage Weight
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            className="rounded-lg"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
              className="hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              <Typography className="text-gray-700 dark:text-gray-300 flex items-center">
                <MdCategory className="text-xl mr-2" />
                Home Side Banner
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul className="ml-4 space-y-4">
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Banner List
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                  Banner Add
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <li>
            <Link href="/order">
              <span>Orders</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button className="w-full bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center hover:bg-blue-600">
          <MdLogout className="mr-2 text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
