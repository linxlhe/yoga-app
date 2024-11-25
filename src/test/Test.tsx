import React from "react";
import { Entity } from "./types";
import { Apple } from "./Apple";
import { Orange } from "./Orange";
import { Page } from "./Page";
import { Input } from "../components/Input";
import { Basket } from "./Basket";

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
    // Counter to generate unique IDs
    const counter = React.useRef(5);
    const getId = () => {
        const value = counter.current;
        counter.current++;
        return value;
    };

    // Initial data
    const apples: Entity[] = [
        { id: 0, element: <Apple name="First" /> },
        { id: 1, element: <Apple name="Second" /> },
        { id: 2, element: <Apple name="Third" /> },
    ];

    const oranges: Entity[] = [
        { id: 3, element: <Orange name="First" /> },
        { id: 4, element: <Orange name="Second" /> },
    ];

    // State for apples, oranges, and baskets
    const [appleList, setAppleList] = React.useState(apples);
    const [orangeList, setOrangeList] = React.useState(oranges);
    const [basketList, setBasketList] = React.useState<{ id: number; element: React.ReactNode }[]>([]);

    // Handle entity click
    const onClick = (id: number) => {
        const allEntities = [...appleList, ...orangeList];
        const clickedEntity = allEntities.find((entity) => entity.id === id);
        console.log("Clicked entity:", clickedEntity);
    };

    // Add a new apple
    const addApple = (name: string) => {
        const newApple: Entity = {
            id: getId(),
            element: <Apple name={name} />,
        };
        setAppleList([...appleList, newApple]);
    };

    // Add a new orange
    const addOrange = (name: string) => {
        const newOrange: Entity = {
            id: getId(),
            element: <Orange name={name} />,
        };
        setOrangeList([...orangeList, newOrange]);
    };

    // Add apples and oranges to a basket
    const addToBasket = () => {
        const selectedApples = appleList; // For simplicity, include all apples
        const selectedOranges = orangeList; // Include all oranges

        const list = [...selectedApples, ...selectedOranges];
        const newBasket = {
            id: getId(),
            element: (
                <Basket>
                    <>
                        {list.map((item) => (
                            <div key={item.id}>{item.element}</div>
                        ))}
                    </>
                </Basket>
            ),
        };

        setBasketList((prev) => [...prev, newBasket]);
    };

    return (
        <>
            {/* Render Page */}
            <Page entities={[...appleList, ...orangeList]} onClick={onClick} />

            <div>
                <h2>Add Apples</h2>
                <Input onSubmit={addApple} />
            </div>

            <div>
                <h2>Add Oranges</h2>
                <Input onSubmit={addOrange} />
            </div>


            <div>
                <h2>Create Basket with Apples and Oranges</h2>
                <button onClick={addToBasket}>Add to Basket</button>
            </div>

   
            <div>
                <h2>Baskets</h2>
                {basketList.map((basket) => (
                    <div key={basket.id}>{basket.element}</div>
                ))}
            </div>
        </>
    );
};
