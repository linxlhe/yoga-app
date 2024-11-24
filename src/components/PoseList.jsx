// Display a list of yoga poses
import React from "react";
import PoseCard from "./PoseCard";
import "./PoseList.css";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

const PoseList = ({ poses }) => {
  // const {setNodeRef} = useDroppable({
  //   id: 

  // });


  return (
    <div className="column" onClick={onClick}>
      <SortableContext items={poses} strategy={verticalListSortingStrategy}>
        {poses.map((pose) => (
          <PoseCard id={pose.id} name={pose.name} key={pose.id} />
        ))}
      </SortableContext>
    </div>
  );
};


export default PoseList;
