import React, { useState } from "react";
import { Box } from "grommet";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

const Test = () => {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(["0", "1", "2", "3", "4"]);

  const [items1, setItems1] = useState(["5", "6"]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
      setItems1((items1) => {
        const oldIndex = items1.indexOf(active.id);
        const newIndex = items1.indexOf(over.id);

        return arrayMove(items1, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <Box
        flex={true}
        wrap={true}
        direction="row"
        style={{ maxWidth: "600px" }}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((id) => (
            <SortableItem key={id} id={id} handle={true} value={id} />
          ))}
        </SortableContext>
      </Box>
    </DndContext>
  );
};

export default Test;
