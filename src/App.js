import "./App.css";
import React, { useState, useRef } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { initialPoses } from "./data/initialPoses";
import PoseList2 from "./components/PoseList2";
import PoseList1 from "./components/PoseList1";
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

const startingList = initialPoses.map((template) => ({ kind: "template", value: template }));

function App() {
  const counter = useRef(startingList.length);
  const getId = () => {
    const value = counter.value;
    counter.value++;

    return value;
  };

  const [state, setState] = useState(startingList);


  const templates = state.filter(({ kind }) => kind === "template").map(({ value }) => value);
  const sequence = state.filter(({ kind }) => kind === "instances").map(({ value }) => value);

  console.log(templates);

  const lookup = new Map(state.map((value) => [value.value.id, value]));

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
      setState((state) => {
        const dragIndex = state.findIndex(({ value: { id } }) => id === dragItem.value.id);
        const dropIndex = state.findIndex(({ value: { id } }) => id === dropItem.value.id);

        return arrayMove(state, dragIndex, dropIndex)
      });
    } else if (dragItem.kind === "template") {
      const newElement = {
        kind: "instance",
        value: {
          id: getId(),
          templateId: dragItem.value.id,
          name: dragItem.value.name
        }
      }

      setState((state) => [...state, newElement]);
    } else {
      setState((state) => {
        return state.filter(({ value: { id } }) => id !== dragItem.value.id);
      })
    }
  }

  const addPoseToPoseList = (name) => {
    setState((state) => [...state, { kind: "template", value: {id: getId(), name } }]);
  };

  return (
    <>
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div>
          <h1>Postures</h1>
          <Input onSubmit={addPoseToPoseList} />
          <PoseList1 poses={templates} />
        </div>

        <div>
          <h1>My Sequence</h1>
          {/* <Input onSubmit={addPoseToSequence} /> */}
          <PoseList2 poses={sequence} />
        </div>
      </DndContext>
    </>
  );
}

export default App;
