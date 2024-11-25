import React from "react";

export interface Props {
    children: React.ReactNode;
}

export const Basket = (props: Props) => {
  return <div>
    <p>I am a basket with elements: </p>
    <ul>
      {React.Children.map(props.children, (child,index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
    </div>;
};
