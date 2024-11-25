// Display a list of yoga poses
import React from "react";
import PoseCard from "./PoseCard";
import "./PoseList.css";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

const PoseList = ({ poses, id, container }) => {
  const {setNodeRef} = useDroppable({
    id: id,
    data: {
      type: container,
      
    }
  });


  return (
    <div className="column" ref={setNodeRef}>
      <SortableContext items={poses} strategy={verticalListSortingStrategy}>
        {poses.map((pose) => (
          <PoseCard id={pose.id} name={pose.name} key={pose.id} />
        ))}
      </SortableContext>
    </div>
  );
};


export default PoseList;
