import './App.css';
import React, {useState} from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { poses } from './data/poses';
import PoseList from './components/PoseList';
import { arrayMove } from '@dnd-kit/sortable';


function App() {
  const [sequence, setSequence] = useState(poses);

  const getPosePos = id => sequence.findIndex(sequence => sequence.id === id);

  const handleDragEnd = event => {
    const {active, over} = event;

    // let go at the same position
    if(active.id === over.id) return;
    setSequence(sequence => {
      const originalPos = getPosePos(active.id);
      const newPos = getPosePos(over.id);
      return arrayMove(sequence, originalPos, newPos);
    })
  }
  return (
    <div>
      <h1>My Sequence</h1>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <PoseList poses={sequence}></PoseList>
      </DndContext>
    </div>
    
  );
}

export default App;
