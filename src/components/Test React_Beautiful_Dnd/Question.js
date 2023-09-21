import React, { Component } from "react";
import ReactDOM from "react-dom";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragSvg from "../DragSvg";
// import console = require('console');

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  console.log("copy ==> dest", destination);

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  console.log("move ==> dest", destination);
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const Content = styled.div`
  margin-right: 200px;
  max-width: calc(100% - 100px);
  min-width: calc(100% - 100px);
`;

const Item = styled.div`
  user-select: none;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 10px;
  background: #fff;
  border: 1px ${(props) => (props.isDragging ? "dashed #4099ff" : "solid #ddd")};
  width: 100%;
  resize: horizontal;
  overflow: hidden;
  min-width: 50px;
  min-height: 100px;
  position: relative;
`;

const Clone = styled(Item)`
  + div {
    display: none !important;
  }
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  user-select: none;
  line-height: 1.5;
  background: transparent;
`;

const List = styled.div`
  border: 1px
    ${(props) => (props.isDraggingOver ? "dashed #000" : "solid #ddd")};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
`;

const Container = styled(List)`
  background: #ccc;
  min-width: 100%;
  display: flex;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin: 0.5rem;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
`;

const SettingsMenu = styled.div`
  display: flex;
  height: 25px;
  max-width: 150px;
  background: #ccc;
  position: absolute;
  top: 0;
  right: 0;
`;

const ButtonText = styled.div`
  margin: 0 1rem;
`;

const ITEMS = [
  {
    id: uuid(),
    content: "Text",
  },
  {
    id: uuid(),
    content: "Numbers",
  },
  {
    id: uuid(),
    content: "Button",
  },
];

class App extends Component {
  state = {
    [uuid()]: [],
  };
  onDragEnd = (result) => {
    const { source, destination } = result;

    console.log("==> result", result);

    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState({
          [destination.droppableId]: reorder(
            this.state[source.droppableId],
            source.index,
            destination.index
          ),
        });
        break;
      case "ITEMS":
        this.setState({
          [destination.droppableId]: copy(
            ITEMS,
            this.state[destination.droppableId],
            source,
            destination
          ),
        });
        break;
      default:
        this.setState(
          move(
            this.state[source.droppableId],
            this.state[destination.droppableId],
            source,
            destination
          )
        );
        break;
    }
  };

  addList = (e) => {
    this.setState({ [uuid()]: [] });
  };

  addQuestion = (e, list) => {
    var newList = this.state[list];
    newList.push({ id: uuid() });
    console.log(newList);
    this.setState(
      this.state[list].length
        ? { [list]: newList }
        : { [list]: [{ id: uuid() }] }
    );
    console.log(this.state[list]);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Content>
          {Object.keys(this.state).map((list, i) => {
            console.log("==> list", list);
            return (
              <>
                <Droppable key={list} droppableId={list} direction="horizontal">
                  {(provided, snapshot) => (
                    <Container
                      ref={provided.innerRef}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      {this.state[list].map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Item
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              isDragging={snapshot.isDragging}
                              style={provided.draggableProps.style}
                            >
                              <></>
                              <SettingsMenu>
                                <Handle {...provided.dragHandleProps}>
                                  <DragSvg />
                                </Handle>
                              </SettingsMenu>
                              {item.content}
                            </Item>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Container>
                  )}
                </Droppable>
                <Button onClick={(e) => this.addQuestion(e, list)}>
                  <ButtonText>Add Question</ButtonText>
                </Button>
              </>
            );
          })}
        </Content>
      </DragDropContext>
    );
  }
}

export default App;
