import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SideBarDataAdmin = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Manage Users",
    path: "/manageUser",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Manage Terrains",
    path: "/manageTerrains",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "My Profile",
    path: "/myProfile",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
