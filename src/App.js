import "./App.css";
import React, { useState, useRef } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { initialPoses } from "./data/initialPoses";
import PoseList from "./components/PoseList";
import { arrayMove } from "@dnd-kit/sortable";
import { Input } from "./components/Input";

/**
 * interface PoseTemplate {
 *   id: number; // needed by dnd-context
 *   name: string;
 * }
 *
 * interface PoseInstance {
 *   id: number;
 *
 *   templateId: number;
 *   name: string;
 * }
 *
 * type ManagedListItem =
 *  | { kind: "template", value: PoseTemplate }
 *  | { kind: "instance", value: PoseInstance }
 *
 *
 */

const startingList = initialPoses.map((template) => ({
  kind: "template",
  value: template,
}));

function App() {
  const counter = useRef(startingList.length);
  const getId = () => {
    const value = counter.current;
    counter.current++;

    return value;
  };

  const [state, setState] = useState(startingList);

  const templates = state
    .filter(({ kind }) => kind === "template")
    .map(({ value }) => value);
  const sequence = state
    .filter(({ kind }) => kind === "instance")
    .map(({ value }) => value);

  console.log(templates);

  const lookup = new Map(state.map((value) => [value.value.id, value])); // change variable name


// Try to determine actions based on source and destination containers:
// 1. Reorder within same container
// 2. Create new instance when dragging from templates to sequence
// 3. Remove item when dragging from sequence back to templates

  const handleDragEnd = (event) => {
    console.log(event);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const dragItem = lookup.get(active.id);
    const dropItem = lookup.get(over.id);

    if (!dragItem || !dropItem) {
      console.warn("How did this get undefined????");
      return;
    }

    

    console.log(dragItem, dropItem);

    if (dragItem.kind === dropItem.kind) {
      console.log("hi i am hereeee");
      setState((state) => {
        const dragIndex = state.findIndex(
          ({ value: { id } }) => id === dragItem.value.id
        );
        const dropIndex = state.findIndex(
          ({ value: { id } }) => id === dropItem.value.id
        );

        return arrayMove(state, dragIndex, dropIndex);
      });
    } else if (dragItem.kind === "template") {
      console.log("different caseeee");
      const newElement = {
        kind: "instance",
        value: {
          id: getId(),
          templateId: dragItem.value.id,
          name: dragItem.value.name,
        },
      };

      setState((state) => [...state, newElement]);
    } else {
      setState((state) => {
        return state.filter(({ value: { id } }) => id !== dragItem.value.id);
      });
    }
  };

  const addPoseToPoseList = (name) => {
    setState((state) => [
      ...state,
      { kind: "template", value: { id: getId(), name } },
    ]);
  };

  const addPoseToSequence = (name) => {
    setState((state) => [
      ...state,
      { kind: "template", value: { id: getId(), name } },
    ]);
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <div>
          <h1>Postures</h1>
          <Input onSubmit={addPoseToPoseList} />
          <PoseList poses={templates} />
        </div>

        <div>
          <h1>My Sequence</h1>
          <Input onSubmit={addPoseToSequence} />
          <PoseList poses={sequence} />
        </div>
      </DndContext>
    </>
  );
}

export default App;
