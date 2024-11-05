// Represents an individual yoga pose
import React from "react";

const PoseCard = ({ pose, onDragStart }) => {
    return (
    <div draggable onDragStart={(e) => onDragStart(e, pose)}>
        <div>{pose.name}</div>
    </div>);
};

export default PoseCard;
