// Display a list of yoga poses
import React from "react";
import PoseCard from "./PoseCard";
import "./PoseList.css";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const PoseList1 = ({ poses }) => {
  return (
    <div className="column">
      <SortableContext items={poses} strategy={verticalListSortingStrategy}>
        {poses.map((pose) => (
          <PoseCard id={pose.id} name={pose.name} key={pose.id} />
        ))}
      </SortableContext>
    </div>
  );
};

export default PoseList1;
