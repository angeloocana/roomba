import React from "react";
import { generateGrid, initialState, moveForward, State, turnRight } from "./roombaCore";
export type { Direction } from "./roombaCore";

type Action = {
    type: "turnRight"
} | {
    type: "moveForward"
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'turnRight': return turnRight(state);
        case 'moveForward': return moveForward(state);
        default: 
            throw new Error("invalid action");
    }
}

export function useRoomba() {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return {
        turnRight: () => dispatch({ type: "turnRight" }),
        moveForward: () => dispatch({ type: "moveForward" }),
        grid: generateGrid(state)
    }
}

