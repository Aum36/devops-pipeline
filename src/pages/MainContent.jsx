import React, { useState } from "react";
import "./LandingPage.css";
import DefaultContent from "../Components/DefaultContent";
import MyForm from "../Components/MyForm";
import LPContent from "../Components/LandingPageComps/LPContent";
import Counter from "../Components/Counter";
const MainContent = ({ activeTab, sections, setDisplayName }) => {
  const idx = activeTab.indexOf(true);
  switch (idx) {
    case 0:
      return <LPContent />;
    case 1:
      return <MyForm setDisplayName={setDisplayName} />;
    case 2:
      return <Counter />;

    default:
      return <DefaultContent contentHeader={sections[idx]} />;
  }
};

export default MainContent;
