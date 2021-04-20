
export type Position = {
    x: number;
    y: number;
}

export type State = {
    size: number;
    position: Position;
    direction: Direction;
}

export type Direction = "top" | "left" | "bottom" | "right";

export const initialState: State = {
    size: 10,
    position: { x: 0, y: 0 },
    direction: "right"
};

const turnRightMap: Record<Direction, Direction> = {
    "bottom": "left",
    "left": "top",
    "right": "bottom",
    "top": "right"
}

/** rotate roomba clockwise */
export function turnRight(state: State): State {
    return {
        ...state,
        direction: turnRightMap[state.direction]
    }
}

/** move forward or rotate roomba to avoid hitting a wall */
export function moveForward(state: State): State {
    if (shouldRotate(state)) {
        return turnRight(state);
    }

    return {
        ...state,
        position: incrementPosition(state.position, state.direction)
    };
}

/** return true when roomba is going to hit a wall */
function shouldRotate(state: State): boolean {
    const { direction, position, size } = state;
    const { x, y } = position;

    const limit = size - 1;

    return (direction === "right" && x === limit)
            || (direction === "bottom" && y === limit)
            || (direction === "left" && x === 0)
            || (direction === "top" && y === 0)
}

/** Increment x or y according to the direction */
function incrementPosition(position: Position, direction: Direction): Position {
    const { x, y } = position;

    switch(direction) {
        case "right": return { x: x + 1, y };
        case "bottom": return { x, y: y + 1 };
        case "left": return { x: x - 1, y };
        default /* top */: return { x, y: y - 1 };
    }
}

type Cell = {
    hasRoomba: false
} | {
    hasRoomba: true,
    roombaDirection: Direction
}

type Grid = Cell[][];

export function generateGrid(state: State): Grid {
    const { size, position, direction } = state;

    const positions = createArray(size);

    return positions.map((_, x) => positions.map((_, y) => {
        return samePosition(position, { x, y })
            ? { hasRoomba: true, roombaDirection: direction }
            : { hasRoomba: false }
    }))
}

function samePosition(a: Position, b: Position): boolean {
    return a.x === b.x && a.y === b.y;
}

function createArray(size: number): any[] {
    return new Array(size).fill(undefined);
}
