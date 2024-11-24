import React from "react";

export interface Props {
    children: React.ReactNode;
}

export const Apple = (props: Props) => {
  return <div>I am a basket with elements: {props.children}</div>;
};
