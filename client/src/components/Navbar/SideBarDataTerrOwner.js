import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SideBarDataTerrOwner = [
  {
    title: "My Profile",
    path: "/profile",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "My Terrains",
    path: "/myTerrains",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Reservation Demandes",
    path: "/reservationDemande",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Add New Terrain",
    path: "/addTerrain",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
