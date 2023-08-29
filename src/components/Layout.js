import React from "react";
import Hnavbar from "./Hnavbar";
import Vnavbar from "./Vnavbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Hnavbar></Hnavbar>
      {children}
      <Vnavbar></Vnavbar>
    </div>
  );
};

export default Layout;
