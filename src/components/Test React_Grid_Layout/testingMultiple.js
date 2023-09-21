import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { Box, Grid, CardActions } from "@mui/material";
import "./section.css";

import { Responsive, WidthProvider, DragOverEvent } from "react-grid-layout";

const ReactGridLayout = WidthProvider(Responsive);

class Sections extends React.PureComponent {}

class Section extends React.PureComponent {
  static defaultProps = {
    isDraggable: true,
    isResizable: true,
    preventCollision: false,
    isDroppable: true,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },

    cols: { lg: 6, md: 6, sm: 6, xs: 6, xxs: 1 },
  };

  a = "";

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
    const newItem = {
      x: 0,
      y: 0,
      w: 2,
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
      "question-layout-" + this.props.data,
      JSON.stringify(_layout)
    );
  };

  removeItem = (item, e) => {
    const { layout } = this.state;
    const _layout = [...layout];
    console.log(_layout);
    console.log(item.i);
    for (let index = 0; index < _layout.length; index++) {
      if (_layout[index].i == item.i) {
        console.log(_layout[index]);
        _layout.splice(index, 1);
      }
    }
    this.setState({ layout: _layout });
    console.log(_layout);
  };

  onDrop = (layout, layoutItem, _event) => {
    console.log(layoutItem);
    console.log(layout);
    console.log(_event);
    return false;
  };

  startDrag = () => {
    console.log("a");
  };

  render() {
    return (
      <>
        <ReactGridLayout
          {...this.props}
          onLayoutChange={this.handleLayoutChange}
          draggableHandle=".drag-handle"
          onDrop={this.startDrag()}
          isBounded={false}
          droppingItem={{ i: "xx", h: 1, w: 1 }}
          style={{ width: "100%" }}
        >
          {this.state.layout.map((item) => (
            <div id={item.i} key={item.i} data-grid={item}>
              <Button
                className="drag-handle"
                style={{
                  background: "grey",
                  height: "30px",
                }}
              ></Button>
              <textarea style={{}}></textarea>
            </div>
          ))}
        </ReactGridLayout>

        <button onClick={this.addNewItem}>Add item</button>
      </>
    );
  }
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DragFromOutsideLayout = () => {
  const [compactType, setcompactType] = useState("vertical");
  const [mounted, setmounted] = useState(false);
  const [layout, setlayout] = useState([
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 3, h: 2 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
    { i: "d", x: 0, y: 2, w: 1, h: 2 },
  ]);

  useEffect(() => {
    setmounted(true);
  }, []);

  const onCompactTypeChange = () => {
    const oldCompactType = compactType;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    setcompactType(compactType);
  };

  const onDrop = (elemParams) => {
    alert(
      `Element parameters:\n${JSON.stringify(
        elemParams,
        ["x", "y", "w", "h"],
        2
      )}`
    );
  };

  return (
    <div>
      <div>Compaction type: {compactType || "No Compaction"}</div>
      <button onClick={onCompactTypeChange}>Change Compaction Type</button>
      <div className="droppable-element" draggable={true}>
        Droppable Element (Drag me!)
      </div>
      <ResponsiveReactGridLayout
        rowHeight={30}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        layout={layout}
        onDrop={onDrop}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        isDroppable={true}
        droppingItem={{ i: "xx", h: 50, w: 250 }}
      >
        {layout.map((itm, i) => (
          <div key={itm.i} data-grid={itm} className="block">
            {i}
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Section;
