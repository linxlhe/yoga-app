import React from "react";
import { Entity } from "./types";

interface Props {
    entities: Entity[];

    onClick: (id: number) => void;
}

export const Page = (props: Props) => {
    const click = (e: Entity) => {
        props.onClick(e.id);
    } 

    return (
        <div>
            { props.entities.map((e) => 
                <div onClick={() => click(e)} key={e.id}>
                    {e.element}
                </div>
            )}
        </div>
    )
}