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

const startingList = initialPoses.map((pose) => ({
  kind: "template",
  value: pose,
}));

function App() {
  const counter = useRef(startingList.length);
  const getId = () => {
    counter.current++;
    const value = counter.current;
    
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

  const lookup = new Map(state.map((item) => [item.value.id, item]));


// Try to determine actions based on source and destination containers:
// 1. Reorder within same container
// 2. Create new instance when dragging from templates to sequence
// 3. Remove item when dragging from sequence back to templates

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // dragItem is an item
    // dorpItem is a container

    // We first need to check which container we are in
    // 1. we are in the sequence container
    // 1.1 if we are coming from template, we are creating new pose
    // 1.2 if its the same we are just reordering


    // 2. we are in the template container
    // 2.1 If we are coming from sequence container, we want to delete the pose from sequence
    // 2.2 If its the same we are just reordering

    const dragItem = lookup.get(active.id);
    const overType = over.data.current?.type;
    console.log("Active:", {
      id: active.id,
      data: active.data.current
    });
    
    console.log("Over:", {
      id: over?.id,
      data: over?.data.current
    });

    console.log("OverType", overType);

    if (overType === "t") {
      if (dragItem.kind === "template") {
        // reordering
        const dragIndex = state.findIndex(({value : {id}}) => id === dragItem.value.id);
        const dropIndex = state.findIndex(({value: {id}}) => id === active.id)

        setState((state) => arrayMove(state, dragIndex, dropIndex));
      } else {
        // we are dragging from sequence container, delete from sequence
        setState((state) => state.filter((id) => id === dragItem.value.id));
        
        
      }
    } else if (overType === "s"){
      // we are in sequence
      if (dragItem.kind === "template") {
        const newPose = {
          kind: "instance",
          value: {
            id: getId(),
            templateId: dragItem.value.id,
            name: dragItem.value.name,
          },
        }
        setState((state) => [...state, newPose]);
      } else {
        // reordering
        const dragIndex = state.findIndex(({value : {id}}) => id === dragItem.value.id);
        const dropIndex = state.findIndex(({value: {id}}) => id === active.id)

        setState((state) => arrayMove(state, dragIndex, dropIndex));
        
      }
    } else {
      console.log("something seems wrong");
    }
   ``
    // if (!dragItem || !dropItem) {
    //   console.warn("How did this get undefined????");
    //   return;
    // }

    // console.log(dragItem, dropItem);

    // if (dragItem.kind === dropItem.kind) {
    //   setState((state) => {
    //     const dragIndex = state.findIndex(
    //       ({ value: { id } }) => id === dragItem.value.id
    //     );
    //     const dropIndex = state.findIndex(
    //       ({ value: { id } }) => id === dropItem.value.id
    //     );

    //     return arrayMove(state, dragIndex, dropIndex);
    //   });
    // } else if (dragItem.kind === "template" && over.id === "sequence") {
    //   const newElement = {
    //     kind: "instance",
    //     value: {
    //       id: getId(),
    //       templateId: dragItem.value.id,
    //       name: dragItem.value.name,
    //     },
    //   };

    //   setState((state) => [...state, newElement]);
    // } else {
    //   setState((state) => {
    //     return state.filter(({ value: { id } }) => id !== dragItem.value.id);
    //   });
    // }
  };

  const addPoseToPoseList = (name) => {
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
          <PoseList poses={templates} id="t" container="t"/>
        </div>

        <div >
          <h1>My Sequence</h1>
          <PoseList poses={sequence} id="s" container="s"/>
        </div>
      </DndContext>
    </>
  );
}

export default App;
