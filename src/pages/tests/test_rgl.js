import { default as Test_R_Grid_Layout } from "../../components/Test React_Grid_Layout/Test";
import React, { useEffect, useState } from "react";
import { default as TestingMultiple } from "../../components/Test React_Grid_Layout/testingMultiple";
import { Container, Input, Box, Button, TextField } from "@mui/material";
import { getMaxWidth } from "../../components/Test React_Grid_Layout/Test";

const Test_rgl = () => {
  const [sections, setSections] = useState([{ id: 0, title: "" }]);

  const addSection = () => {
    const test = [...sections];
    test.push({ id: sections[sections.length - 1].id + 1, title: "" });
    setSections(test);
  };

  useEffect(() => {
    console.log(sections);
  }, [sections]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {sections.map((section) => (
        <Box sx={{ marginTop: "100px" }}>
          <Box
            sx={{
              paddingX: "30px",
              background: "white",
              borderRadius: "20px",
              border: "solid 1px grey",
            }}
          >
            <Input
              multiline
              resize="false"
              id="standard-basic"
              label="Sección"
              variant="standard"
              placeholder="Nueva Sección"
              sx={{
                fontSize: "40px",
                width: "60%",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            />
          </Box>
          <Test_R_Grid_Layout title={section.id}>test_rgl</Test_R_Grid_Layout>
        </Box>
      ))}
      <Button
        sx={{
          marginTop: "100px",
          marginBottom: "100px",
          color: "white",
          background: "#365ed6",
        }}
        onClick={(e) => addSection()}
      >
        Añadir Sección
      </Button>
    </Container>
  );
};

export default Test_rgl;
