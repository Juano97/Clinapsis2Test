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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import "./section.css";

import { Responsive, WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(Responsive);

const maxWidth = 6;

class Section extends React.PureComponent {
  section = 0;

  static defaultProps = {
    isDraggable: true,

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

  addSection = () => {
    console.log(this.section);
    this.section++;
  };

  state = {
    layout: localStorage.getItem("section-layout-" + this.props.data)
      ? Object.values(
          JSON.parse(localStorage.getItem("section-layout-" + this.props.data))
        ).pop()
      : [
          { x: 0, y: 1, w: 3, h: 1, i: 0, isDraggable: true },
          { x: 0, y: 1, w: 6, h: 1, i: 1, isDraggable: true },
        ],
  };

  formtypes = ["text", "radio", "checkbox"];

  form = localStorage.getItem("form-" + this.props.data)
    ? JSON.parse(localStorage.getItem("form-" + this.props.data))
    : {
        0: { title: "", type: "text" },
        1: { title: "", type: "radio", list: [] },
      };

  handleLayoutChange = (layout, layouts) => {
    console.log(this.props);
    console.log(layout);
    console.log(layouts);
    this.setState({ layout });
    localStorage.setItem(
      "section-layout-" + this.props.data,
      JSON.stringify(layouts)
    );
  };

  getLayouts = () => {
    const savedLayouts = localStorage.getItem(
      "section-layout-" + this.props.data
    );
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    return savedLayouts ? JSON.parse(savedLayouts) : this.state.layout;
  };

  increaseHeight = (e) => {
    const id = e.target.parentNode.parentNode.parentNode.id;
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
      "section-layout-" + this.props.data,
      JSON.stringify(_layout)
    );
  };

  addNewItem = (e, _id) => {
    const { layout } = this.state;
    console.log(layout);
    console.log(_id);
    const id = _id;
    console.log(id);
    var maxY = -1;
    var maxId = -1;
    // for (let i = 0; i < layout.length; i++) {
    //   console.log(layout[i]);
    //   if (layout[i].y > maxY) maxY = layout[i].y;
    //   if (parseInt(layout[i].i) > maxId) maxId = parseInt(layout[i].i);
    // }
    for (let i = 0; i < layout.length; i++) {
      console.log(layout[i]);
      if (layout[i].i === id) maxY = layout[i].y;
      if (parseInt(layout[i].i) > maxId) maxId = parseInt(layout[i].i);
    }
    const newItem = {
      x: 0,
      y: 0,
      w: maxWidth,
      h: 1,
      i: 0,
    };

    console.log(layout);
    newItem.i = (maxId + 1).toString();
    newItem.y = maxY;
    console.log(maxY);
    const _layout = layout.concat([newItem]);
    this.form[maxId + 1] = { title: "", type: "text" };
    this.setState({ layout: _layout });
    localStorage.setItem(
      "section-layout-" + this.props.data,
      JSON.stringify(_layout)
    );
    localStorage.setItem("form-" + this.props.data, JSON.stringify(this.form));
    console.log(this.form);
  };

  removeItem = (e, _id) => {
    const id = _id;
    const { layout } = this.state;
    const form = this.form;
    console.log(layout);
    const _layout = [];
    const _form = [];
    for (let i = 0; i < layout.length; i++) {
      if (layout[i].i == id) continue;
      _layout[i] = layout[i];
      _form[i] = form[i];
    }
    console.log(_layout);
    this.setState({ layout: _layout });
    this.form = _form;
    localStorage.setItem(
      "section-layout-" + this.props.data,
      JSON.stringify(_layout)
    );
    localStorage.setItem("form-" + this.props.data, JSON.stringify(this.form));
  };

  handleTitleChange = (e, i) => {
    console.log(e);
    console.log(i);
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactGridLayout
          {...this.props}
          onLayoutChange={this.handleLayoutChange}
          draggableHandle=".drag-handle"
          isDroppable={true}
          onDropDragOver={console.log("a")}
          layouts={this.getLayouts()}
          style={{ width: "60%" }}
        >
          {this.state.layout.map((item) => (
            <Box
              id={item.i}
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
                container
                style={{
                  width: "100%",
                  background: "white",
                  border: "solid 1px grey",
                  borderRadius: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button className="drag-handle">
                    <DragIndicatorIcon
                      sx={{ transform: "rotate(90deg)", color: "black" }}
                    />
                  </Button>
                </Box>
                <Box sx={{ padding: "10px" }}>
                  <TextField
                    id="standard-basic"
                    label="Pregunta"
                    variant="standard"
                    onChange={(e) =>
                      this.handleTitleChange(e.target.value, item.i)
                    }
                  />
                  {this.form[item.i].type === "text" ? <></> : <></>}
                </Box>
              </Box>
              <ToggleButtonGroup
                orientation="vertical"
                sx={{ display: "flex" }}
              >
                <ToggleButton
                  sx={{ border: "none", flexGrow: "1" }}
                  onClick={(e) => this.removeItem(e, item.i)}
                >
                  <DeleteIcon />
                </ToggleButton>
                <ToggleButton
                  sx={{ border: "none", flexGrow: "1" }}
                  onClick={(e) => this.addNewItem(e, item.i)}
                >
                  <AddCircleIcon />
                </ToggleButton>
                <ToggleButton
                  sx={{ border: "none", flexGrow: "10", visibility: "hidden" }}
                />
                <ToggleButton sx={{ border: "none" }}>
                  <AspectRatioIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          ))}
        </ReactGridLayout>
      </div>
    );
  }
}
export default Section;
