import * as React from "react";
import { Link, navigate } from "gatsby";
import Layout from "../components/Layout";

import { default as Test_Beau_Dnd } from "../components/Test React_Beautiful_Dnd/Test";

const home = () => {
  return (
    <>
      <Layout>
        <Test_Beau_Dnd></Test_Beau_Dnd>
      </Layout>
    </>
  );
};

export default home;
