import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { Box, Grid, CardActions } from "@mui/material";
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
    const id = e.target.parentNode.id;
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

  test = () => {
    const { layout } = this.state;
    const { layouts } = this.getLayouts();
    console.log(layout);
    console.log(layouts);
  };

  addNewItem = () => {
    const { layout } = this.state;
    console.log(layout);
    var maxY = -1;
    var maxId = -1;
    for (let i = 0; i < layout.length; i++) {
      console.log(layout[i]);
      if (layout[i].y > maxY) maxY = layout[i].y;
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
    newItem.y = maxY + 1;
    console.log(maxY);
    const _layout = layout.concat([newItem]);
    this.setState({ layout: _layout });
    localStorage.setItem(
      "section-layout-" + this.props.data,
      JSON.stringify(_layout)
    );
  };

  removeItem = () => {};

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
          style={{ width: "100%" }}
        >
          {this.state.layout.map((item) => (
            <div
              id={item.i}
              key={item.i}
              data-grid={item}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                className="drag-handle"
                style={{
                  background: "grey",
                  height: "30px",
                }}
              ></Button>
              <Button
                onClick={(e) => this.increaseHeight(e)}
                draggable="false"
                isdraggable="false"
              >
                Increase Height
              </Button>
            </div>
          ))}
        </ReactGridLayout>
      </div>
    );
  }
}
export default Section;
