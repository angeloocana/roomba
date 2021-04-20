import { generateGrid, initialState, moveForward, State, turnRight } from "../roombaCore";

describe("roomba core", () => {
    it("turnRight", () => {
        expect(turnRight({
            ...initialState,
            direction:  "bottom"
        }).direction).toBe("left");

        expect(turnRight({
            ...initialState,
            direction:  "left"
        }).direction).toBe("top");

        expect(turnRight({
            ...initialState,
            direction:  "right"
        }).direction).toBe("bottom");

        expect(turnRight({
            ...initialState,
            direction:  "top"
        }).direction).toBe("right");
    });

    it("moveForward right", () => {
        expect(moveForward(initialState)).toEqual({
            ...initialState,
            position: { x: 1, y: 0 }
        })
    });

    it("moveForward left", () => {
        const state: State = {
            ...initialState,
            position: { x: 1, y: 0},
            direction: "left"
        };

        expect(moveForward(state)).toEqual({
            ...state,
            direction: "left",
            position: { x: 0, y: 0 }
        });
    });

    it("moveForward top", () => {
        const state: State = {
            ...initialState,
            position: { x: 0, y: 1 },
            direction: "top"
        };

        expect(moveForward(state)).toEqual({
            ...state,
            direction: "top",
            position: { x: 0, y: 0 }
        });
    });

    it("moveForward bottom", () => {
        const state: State = {
            ...initialState,
            position: { x: 0, y: 0 },
            direction: "bottom"
        };

        expect(moveForward(state)).toEqual({
            ...state,
            direction: "bottom",
            position: { x: 0, y: 1 }
        });
    });

    it("rotate when moveForward right not allowed", () => {
        const state: State = {
            ...initialState,
            position: { x: 9, y: 0 },
            direction: "right"
        };

        expect(moveForward(state)).toEqual({
            ...state,
            position: { x: 9, y: 0 },
            direction: "bottom"
        });
    });

    it("rotate when moveForward left not allowed", () => {
        const state: State = {
            ...initialState,
            position: { x: 0, y: 0 },
            direction: "left"
        };

        expect(moveForward(state)).toEqual({
            ...state,
            position: { x: 0, y: 0 },
            direction: "top"
        });
    });
    
    it("rotate when moveForward top not allowed", () => {
        const state: State = {
            ...initialState,
            position: { x: 0, y: 0 },
            direction: "top"
        };

        expect(moveForward(state)).toEqual({
            ...state,
            position: { x: 0, y: 0 },
            direction: "right"
        });
    });

    it("rotate when moveForward bottom not allowed", () => {
        const state: State = {
            ...initialState,
            position: { x: 0, y: 9 },
            direction: "bottom"
        };

        expect(moveForward(state)).toEqual({
            ...state,
            position: { x: 0, y: 9 },
            direction: "left"
        });
    });

    it("generate initial grid", () => {
        const grid = generateGrid(initialState);

        expect(grid.length).toEqual(initialState.size);
        expect(grid[0].length).toEqual(initialState.size);
        expect(grid[0][0]).toEqual({ hasRoomba: true, roombaDirection: "right" });
        expect(grid[0][1]).toEqual({ hasRoomba: false });
    });
});
