import "./App.css";
import React, { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { initialPoses } from "./data/initialPoses";
import PoseList from "./components/PoseList";
import PoseList1 from "./components/PoseList1";
import { arrayMove } from "@dnd-kit/sortable";
import { Input } from "./components/Input";

function App() {
  const [sequence, setSequence] = useState([]);
  const [poses, setPoses] = useState(initialPoses);

  const handleDragEndSequence = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSequence((currentSequence) => {
      const originalPos = currentSequence.findIndex((pose) => pose.id === active.id);
      const newPos = currentSequence.findIndex((pose) => pose.id === over.id);
      return arrayMove(currentSequence, originalPos, newPos);
    });
  };

  const handleDragEndPoses = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPoses((currentPoses) => {
      const originalPos = currentPoses.findIndex((pose) => pose.id === active.id);
      const newPos = currentPoses.findIndex((pose) => pose.id === over.id);
      return arrayMove(currentPoses, originalPos, newPos);
    });
  };

  const addPoseToSequence = (name) => {
    setSequence(prev => [...prev, { 
      id: prev.length ? Math.max(...prev.map(p => p.id)) + 1 : 1, 
      name 
    }]);
  };

  const addPoseToPoseList = (name) => {
    setPoses(prev => [...prev, { 
      id: prev.length ? Math.max(...prev.map(p => p.id)) + 1 : 1, 
      name 
    }]);
  };

  return (
    <>
      <DndContext 
        onDragEnd={handleDragEndPoses} 
        collisionDetection={closestCorners}
      >
        <div>
          <h1>Postures</h1>
          <Input onSubmit={addPoseToPoseList} />
          <PoseList poses={poses} />
        </div>
      </DndContext>

      <DndContext 
        onDragEnd={handleDragEndSequence} 
        collisionDetection={closestCorners}
      >
        <div>
          <h1>My Sequence</h1>
          <Input onSubmit={addPoseToSequence} />
          <PoseList1 poses={sequence} />
        </div>
      </DndContext>
    </>
  );
}

export default App;
