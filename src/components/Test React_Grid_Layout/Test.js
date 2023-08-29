import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { Box, Grid, CardActions } from "@mui/material";
import "./section.css";

import { Responsive, WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(Responsive);

class Sections extends React.PureComponent {}

class Section extends React.PureComponent {
  static defaultProps = {
    isDraggable: true,
    isResizable: true,
    preventCollision: false,
    isDroppable: true,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 },
  };

  state = {
    layout: localStorage.getItem("question-layout-" + this.props.data)
      ? JSON.parse(localStorage.getItem("question-layout-" + this.props.data))
      : [],
  };

  handleLayoutChange = (layout) => {
    console.log(this.props);
    this.setState({ layout });
    localStorage.setItem(
      "question-layout-" + this.props.data,
      JSON.stringify(layout)
    );
  };

  addNewItem = () => {
    const { layout } = this.state;
    var maxY = -1;
    var maxId = -1;
    for (let i = 0; i < layout.length; i++) {
      console.log(layout[i]);
      if (layout[i].y > maxY) maxY = layout[i].y;
      if (parseInt(layout[i].i) > maxId) maxId = parseInt(layout[i].i);
    }
    const newItem = { x: 0, y: 0, w: 2, h: 1, i: 0 };
    console.log(layout);
    newItem.i = (maxId + 1).toString();
    newItem.y = maxY + 1;
    console.log(maxY);
    const _layout = layout.concat([newItem]);
    this.setState({ layout: _layout });
    localStorage.setItem(
      "question-layout-" + this.props.data,
      JSON.stringify(_layout)
    );
  };

  removeItem = () => {};

  render() {
    return (
      <div id="1">
        <ReactGridLayout
          {...this.props}
          onLayoutChange={this.handleLayoutChange}
          draggableHandle=".drag-handle"
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
              <textarea style={{ position: "relative" }}></textarea>
            </div>
          ))}
        </ReactGridLayout>
        <button onClick={this.addNewItem}>Add item</button>
      </div>
    );
  }
}
export default Section;
