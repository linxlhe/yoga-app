import "./App.css";
import React, { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { poses } from "./data/poses";
import PoseList from "./components/PoseList";
import { arrayMove } from "@dnd-kit/sortable";

function App() {
  const [availablePoses, setAvailablePoses] = useState(poses);
  const [sequence, setSequence] = useState(poses);

  const getPosePos = (id) =>
    sequence.findIndex((sequence) => sequence.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    // case 1: drop from available poses to sequence
    // if (availablePoses.find(pose => pose.id === active.id ) && over.id === "sequence-container") {

    // }

    // case 2: reorder within sequence
    // if let go at the same position
    // if (over.id === "sequence-container") {
    if (active.id === over.id) return;
    setSequence((sequence) => {
      const originalPos = getPosePos(active.id);
      const newPos = getPosePos(over.id);
      return arrayMove(sequence, originalPos, newPos);
    });
    // }
  };
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div>
        <div>
          <h1>My Sequence</h1>

          <div id="available-poses-container">
            <PoseList poses={sequence}></PoseList>
          </div>
        </div>

        <div>
          <h1>My Available Poses</h1>
          <div id="sequence-container">
            <PoseList poses={sequence}></PoseList>
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default App;
