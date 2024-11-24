import React from "react";
import { Entity } from "./types";
import { Apple } from "./Apple";
import { Orange } from "./Orange";
import { Page } from "./Page";
import { Input } from "../components/Input";


interface Props {
    name: string;
}



/**
 * TODO:
 *  1. Allow dynamically adding apples and oranges
 *  2. Make onclick log the full entity
 *  3. Support baskets
 * 
 * Invariants:
 *  1. You can't change the behavior of Page
 */

export const Test = (props: Props) => {

    // counter to keep generate the unique ids
    const nextId = React.useRef(5);

    const apples: Entity[] = [
        { id: 0, element: <Apple name="First" /> },
        { id: 1, element: <Apple name="Second" /> },
        { id: 2, element: <Apple name="Third" /> },
    ];
    
    const oranges: Entity[] = [
        { id: 3, element: <Orange name="First" /> },
        { id: 4, element: <Orange name="Second" /> },
    ];


    const [appleList, setAppleList] = React.useState(apples);
    const [orangeList, setOrangeList] = React.useState(oranges);

    
    const onClick = (id: number) => {
        console.log(id);
        // ...
    }

    // add apples
    const addApple = (name) => {
        const newApple : Entity = {
            id: nextId.current,
            element: <Apple name={name} />
        }
        setAppleList([...appleList, newApple]);
        
    }

    // add oranges
    const addOrange = (name) => {
        const newOrange : Entity = {
            id: nextId.current,
            element: <Orange name={name} />
        }
        setOrangeList([...orangeList, newOrange]);
    }
    


    return (
       <>
       <Page entities={[...appleList, ...orangeList]} onClick={onClick} />
       <div>
        <h2>Add Apples</h2>
       <Input onSubmit={addApple} />

       </div>
       
       <div>
        <h2>Add Oranges</h2>
       <Input onSubmit={addOrange} />

       </div>
       
       

       </>
         
       
    )
}