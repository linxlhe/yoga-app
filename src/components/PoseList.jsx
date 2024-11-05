// Display a list of yoga poses
import React from "react"
import PoseCard from "./PoseCard"

const PoseList = ({poses, onDragStart}) => {
    return (
        <div>
            {poses.map(pose => (<PoseCard key={pose.id} pose={pose} onDragStart={onDragStart} />))}
        </div>
    )
};

export default PoseList;