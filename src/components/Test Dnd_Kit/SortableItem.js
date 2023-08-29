import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "grommet";
import styled from "styled-components";

const Handle = styled.div`
  width: 30px;
  align-items: center;
  align-content: center;
  user-select: none;
  margin: 0rem 0.5rem 0rem 0rem;
  height: 30px;
  background: #fff;

  color: #000;
`;

const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    minWidth: "46%",
    width: "100%",
    minHeight: "200px",
    backgroundColor: "#cccccc",
    margin: "10px",
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,

    resize: "horizontal",
    overflow: "auto",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Box>
        <Handle
          {...listeners}
          {...attributes}
          style={{ width: "50px", alignSelf: "center" }}
        ></Handle>
        <div
          style={{
            borderTop: "10px",
            padding: "20px",
            minWidth: "30px",
            minHeight: "20px",
            border: "1px solid balck",
            borderColor: "black",
          }}
        >
          {props.value}
        </div>
      </Box>
    </div>
  );
};

export default SortableItem;
