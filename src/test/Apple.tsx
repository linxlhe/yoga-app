import React from "react";

export interface Props {
    name: string;
}

export const Apple = (props: Props) => {
    return <div>I am an apple with name: {props.name}</div>
}