import React from "react";
import * as FaIcons from "react-icons/fa";

import * as IoIcons from "react-icons/io";

export const SideBarDataFootballer = [
  {
    title: "My Profile",
    path: "/profile",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
  {
    title: "Search Terrains",
    path: "/searchTerrains",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "My reservations",
    path: "/myReservations",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
];
