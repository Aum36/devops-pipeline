import React, { useState } from "react";
import LPNavbar from "../Components/LandingPageComps/LPNavbar";
import LPSidebar from "../Components/LandingPageComps/LPSidebar";
import "./LandingPage.css";
// import '../custom.scss'
import MainContent from "./MainContent";

const sections = ["Home", "Profile", "Counter", "Logout", "Settings"];
const LandingPage = () => {
  const [displayName, setDisplayName] = useState("Aum");
  const [activeTab, setActiveTab] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);
  const setSelected = (idx) => {
    setActiveTab((prevActiveTab) => {
      const newArr = [...prevActiveTab];
      for (let i = 0; i < prevActiveTab.length; i++) {
        newArr[i] = false;
        if (i === idx) {
          newArr[i] = true;
        }
      }
      console.log(newArr);
      return newArr;
    });
  };
  return (
    <>
      <LPNavbar displayName={displayName}></LPNavbar>
      <section className="landing-page">
        <LPSidebar
          activeTab={activeTab}
          setSelected={setSelected}
          sections={sections}
        />
        <MainContent
          activeTab={activeTab}
          sections={sections}
          setDisplayName={setDisplayName}
        />
      </section>
      {activeTab[0] && <div className="image-section"></div>}
    </>
  );
};

export default LandingPage;
