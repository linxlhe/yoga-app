import { useState } from "react";

export const useDragAndDrop = ({ sequence, setSequence }) => {
  const [draggedPose, setDraggedPose] = useState(null);

  const handleDragStart = (pose) => {
    setDraggedPose(pose);
  };

  // Allow the dragged item to be dropped
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle the drop action and manage reordering poses with action
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (!draggedPose) return;

    const newSequence = [...sequence];

    // if pose is not already in the sequence, drop it
    if (!sequence.find((p) => p.id === poses.id)) {
      newSequence.splice(dropIndex, 0, pose);
    }

    setSequence(newSequence);
    setDraggedPose(null);
  };

  const removePoseFromSequence = (poseId) => {
    setSequence(sequence.filter((pose) => pose.id === poseId));
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    removePoseFromSequence,
  };
};
