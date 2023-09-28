import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import {
  Box,
  Grid,
  CardActions,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Input,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import "./section.css";

import { useIsOverflow } from "../../hooks/isOverflow";

import { Responsive, WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(Responsive);

const maxWidth = 6;

export const getMaxWidth = () => {
  return maxWidth;
};

class Section extends React.PureComponent {
  static defaultProps = {
    isDraggable: true,
    rowHeight: 20,
    isResizable: true,
    preventCollision: false,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: {
      lg: maxWidth,
      md: maxWidth,
      sm: maxWidth,
      xs: maxWidth,
      xxs: 1,
    },
  };

  update = 1;

  setUpdate = () => this.update++;

  state = {
    layout: localStorage.getItem("section-layout-" + this.props.title)
      ? Object.values(
          JSON.parse(localStorage.getItem("section-layout-" + this.props.title))
        ).pop()
      : [
          { x: 0, y: 1, w: 3, h: 7, i: 0, minH: 7, isDraggable: true },
          { x: 0, y: 1, w: 6, h: 7, i: 1, minH: 7, isDraggable: true },
        ],
  };

  formtypes = ["text", "radio", "checkbox"];
  formtypes_Text = ["Párrafo", "Radio", "CheckBox"];

  form = localStorage.getItem("form-" + this.props.title)
    ? JSON.parse(localStorage.getItem("form-" + this.props.title))
    : {
        0: { title: "", type: "text" },
        1: { title: "", type: "radio", list: [] },
      };

  handleLayoutChange = (layout, layouts) => {
    this.setState({ layout });
    localStorage.setItem(
      "section-layout-" + this.props.title,
      JSON.stringify(layouts)
    );
    localStorage.setItem("form-" + this.props.title, JSON.stringify(this.form));
  };

  getLayouts = () => {
    const savedLayouts = localStorage.getItem(
      "section-layout-" + this.props.title
    );
    return savedLayouts ? JSON.parse(savedLayouts) : this.state.layout;
  };

  increaseHeight = (e, _id) => {
    const id = _id;
    console.log(id);
    const { layout } = this.state;
    console.log(layout);
    for (let i = 0; i < layout.length; i++) {
      console.log(layout[i]);
      if (layout[i].i === id) this.state.layout[i].h++;
    }
    console.log(layout);
    const _layout = [];
    for (let i = 0; i < layout.length; i++) {
      _layout[i] = layout[i];
    }
    console.log(_layout);
    this.setState({ layout: _layout });
    localStorage.setItem(
      "section-layout-" + this.props.title,
      JSON.stringify(_layout)
    );
  };

  decreaseHeight = (e, _id) => {
    const id = _id;
    console.log(id);
    const { layout } = this.state;
    console.log(layout);
    for (let i = 0; i < layout.length; i++) {
      console.log(layout[i]);
      if (layout[i].i === id) this.state.layout[i].h--;
    }
    console.log(layout);
    const _layout = [];
    for (let i = 0; i < layout.length; i++) {
      _layout[i] = layout[i];
    }
    console.log(_layout);
    this.setState({ layout: _layout });
    localStorage.setItem(
      "section-layout-" + this.props.title,
      JSON.stringify(_layout)
    );
  };

  addNewItem = (e, _id) => {
    const { layout } = this.state;
    const id = _id;
    var maxY = -1;
    var maxId = -1;
    for (let i = 0; i < layout.length; i++) {
      console.log(layout[i]);
      if (layout[i].i === id) maxY = layout[i].y;
      if (parseInt(layout[i].i) > maxId) maxId = parseInt(layout[i].i);
    }
    const newItem = {
      x: 0,
      y: maxY,
      w: maxWidth,
      h: 7,
      i: (maxId + 1).toString(),
      minH: 7,
    };
    const _layout = layout.concat([newItem]);
    this.form[maxId + 1] = { title: "", type: "text" };
    this.setState({ layout: _layout });
    localStorage.setItem(
      "section-layout-" + this.props.title,
      JSON.stringify(_layout)
    );
    localStorage.setItem("form-" + this.props.title, JSON.stringify(this.form));
  };

  removeItem = (e, _id) => {
    const id = _id;
    const { layout } = this.state;
    const form = this.form;
    const _layout = [];
    const _form = [];
    for (let i = 0; i < layout.length; i++) {
      if (!layout[i].i || layout[i].i === id) continue;
      _layout[i] = layout[i];
      _form[i] = form[i];
    }
    this.setState({ layout: _layout });
    this.form = _form;
    localStorage.setItem(
      "section-layout-" + this.props.title,
      JSON.stringify(_layout)
    );
    localStorage.setItem("form-" + this.props.title, JSON.stringify(this.form));
  };

  handleTitleChange = (e, i) => {
    this.form[i].title = e.target.value;
    const layout = this.getLayouts();
    const _layout = {};
    Object.assign(_layout, layout);
    console.log(_layout);
    console.log(layout);
    localStorage.setItem(
      "section-layout-" + this.props.title,
      JSON.stringify(_layout)
    );
    localStorage.setItem("form-" + this.props.title, JSON.stringify(this.form));
  };

  handleTypeChange = (e, i) => {
    console.log(e.target.value);
    this.form[i].type = e.target.value;
    localStorage.setItem("form-" + this.props.title, JSON.stringify(this.form));
    this.updateLayout();
  };

  updateLayout = () => {
    const layout = this.state.layout;
    const _layout = [];
    for (let i = 0; i < layout.length; i++) {
      _layout[i] = layout[i];
    }
    console.log(_layout);
    console.log(layout);
    this.setState({ layout: _layout });
  };

  checkOverflow = (e, i) => {
    try {
      console.log(e.target.offsetParent.offsetParent.scrollHeight);
      console.log(e);
      const scrollHeight = e.target.offsetParent.offsetParent.scrollHeight;
      const offsetHeight = e.target.offsetParent.offsetParent.offsetHeight;
      console.log(scrollHeight);
      console.log(offsetHeight);
      if (scrollHeight > offsetHeight) {
        this.increaseHeight(e, i);
      } else {
        console.log(0);
      }
    } catch (error) {
      console.log("error");
    }
  };

  render() {
    return (
      <ReactGridLayout
        {...this.props}
        onLayoutChange={this.handleLayoutChange}
        draggableHandle=".drag-handle"
        isDroppable={true}
        layouts={this.getLayouts()}
        style={{ width: "100%" }}
        update={this.update}
      >
        {this.state.layout.map((item) => (
          <Box
            id={"layout-item-" + item.i}
            key={item.i}
            data-grid={item}
            sx={{
              "& .MuiToggleButtonGroup-root": {
                transition: "200ms ease",
                visibility: "hidden",
              },
              "&:hover .MuiToggleButtonGroup-root": {
                transition: "200ms ease",
                visibility: "visible",
              },
            }}
          >
            <Box
              component="div"
              sx={{
                width: "100%",
                background: "white",
                border: "solid 1px grey",
                borderRadius: "20px",
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  justifyContent: "center",
                  background: "#365ed6",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  border: "1px solid #365ed6",
                }}
              >
                <Button className="drag-handle">
                  <DragIndicatorIcon
                    sx={{ transform: "rotate(90deg)", color: "white" }}
                  />
                </Button>
              </Box>
              <Box
                sx={{
                  padding: "15px",
                  flexGrow: 100,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Input
                    multiline
                    resize="false"
                    id="standard-basic"
                    label="Pregunta"
                    variant="standard"
                    placeholder="Nueva Pregunta"
                    onChange={(e) => {
                      this.handleTitleChange(e, item.i);
                    }}
                    defaultValue={this.form[item.i].title}
                    sx={{ fontSize: "26px", width: "60%" }}
                  />
                  <Box sx={{ flexGrow: 10 }}></Box>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.form[item.i].type}
                      label={this.form[item.i].type}
                      onChange={(e) => this.handleTypeChange(e, item.i)}
                    >
                      {this.formtypes.map((type, i) => (
                        <MenuItem value={type}>
                          {this.formtypes_Text[i]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  {this.form[item.i] ? (
                    this.form[item.i].type === "text" ? (
                      <Input
                        multiline
                        fullWidth
                        rows={item.h - 7}
                        id="standard-basic-text"
                        label="Pregunta"
                        variant="standard"
                        sx={{
                          fontSize: "20px",
                          background: "#f4f4f4",
                          borderTopLeftRadius: "5px",
                          borderTopRightRadius: "5px",
                        }}
                      />
                    ) : (
                      <>CCCCC</>
                    )
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            </Box>
            <ToggleButtonGroup orientation="vertical" sx={{ display: "flex" }}>
              <ToggleButton
                sx={{
                  border: "transparent",
                  flexGrow: "1",
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
                value="Eliminar"
                onClick={(e) => this.removeItem(e, item.i)}
              >
                <DeleteIcon />
              </ToggleButton>
              <ToggleButton
                sx={{ border: "none", flexGrow: "1" }}
                onClick={(e) => this.addNewItem(e, item.i)}
                value="Nueva Pregunta"
              >
                <AddCircleIcon />
              </ToggleButton>
              <ToggleButton
                sx={{ border: "none", flexGrow: "100", visibility: "hidden" }}
                value="None"
              />
              <ToggleButton sx={{ border: "none" }} value="Tamaño">
                <AspectRatioIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        ))}
      </ReactGridLayout>
    );
  }
}
export default Section;
