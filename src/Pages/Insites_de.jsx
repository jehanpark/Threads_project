import React from "react";
import { useMediaQuery } from "react-responsive";
// import Sidebar from "../Components/Sidebar";
import Sidebar_de from "../Components/Sidebar_de";
import Insiteitem_de from "../Components/Login/Insiteitem_de"; // 추가된 부분

const Insites_de = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sidebar_de />
      <Insiteitem_de isSmallScreen={isSmallScreen} />
    </div>
  );
};

export default Insites_de;
