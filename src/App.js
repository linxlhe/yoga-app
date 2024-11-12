import "./App.css";
import React, { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { poses } from "./data/poses";
import PoseList from "./components/PoseList";
import { arrayMove } from "@dnd-kit/sortable";
import { Input } from "./components/Input";

function App() {
  const [sequence, setSequence] = useState(poses);

  const getPosePos = (id) =>
    sequence.findIndex((sequence) => sequence.id === id);

  const addPose = (name) => {
    setSequence(poses => [...poses, {id: poses.length+1, name }])
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
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
          <div id="sequence-container">
            <Input onSubmit={addPose} />
            <PoseList poses={sequence}></PoseList>
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default App;
