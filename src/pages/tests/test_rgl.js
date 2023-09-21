import { default as Test_R_Grid_Layout } from "../../components/Test React_Grid_Layout/Test";
import React from "react";
import { default as TestingMultiple } from "../../components/Test React_Grid_Layout/testingMultiple";

const test_rgl = () => {
  return (
    <div>
      <div>
        <Test_R_Grid_Layout data="1">test_rgl</Test_R_Grid_Layout>
      </div>
      <div>
        <Test_R_Grid_Layout data="2">test_rgl</Test_R_Grid_Layout>
      </div>
    </div>
  );
};

export default test_rgl;
