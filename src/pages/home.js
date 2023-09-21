import * as React from "react";
import { Link, navigate } from "gatsby";
import { Button } from "@mui/material";
import Layout from "../components/Layout";

import { default as Test_Beau_Dnd } from "../components/Test React_Beautiful_Dnd/Test";

const home = () => {
  return (
    <>
      <Button onClick={() => navigate("/tests/test_dndk")}>DnD Kit</Button>
      <br />
      <Button onClick={() => navigate("/tests/test_rbdnd")}>
        React Beautiful DnD
      </Button>
      <br />
      <Button onClick={() => navigate("/tests/test_rgl")}>
        React Grid Layout
      </Button>
    </>
  );
};

export default home;
