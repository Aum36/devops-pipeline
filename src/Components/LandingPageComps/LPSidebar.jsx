import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import HomeIcon from "../icons/HomeIcon";
import LogoutIcon from "../icons/LogoutIcon";
import PatientIcon from "../icons/PatientIcon";
import SettingsIcon from "../icons/SettingsIcon";
import ProfileIcon from "../icons/ProfileIcon";
import "./lp-sidebar.css";

class Section {
  constructor(Icon, iconText) {
    this.Icon = Icon;
    this.iconText = iconText;
  }
}

const LPSidebar = ({ activeTab, setSelected, sections }) => {
  useEffect(() => {
    console.log(activeTab);
  });

  const sectionsObj = [
    new Section(<HomeIcon />, sections[0]),
    new Section(<ProfileIcon />, sections[1]),
    new Section(<PatientIcon />, sections[2]),
    new Section(<LogoutIcon />, sections[3]),
    new Section(<SettingsIcon />, sections[4]),
  ];

  return (
    <div className="lp-sidebar">
      <div className="nav-items">
        {sectionsObj.map((el, idx) => {
          return (
            <NavItem
              isSelected={activeTab[idx]}
              OnClick={() => setSelected(idx)}
              {...el}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LPSidebar;
