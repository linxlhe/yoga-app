import React from "react";

export interface Props {
  name: string;
}

export const Orange = (props: Props) => {
  return <div>I am an orange with name: {props.name}</div>;
};
