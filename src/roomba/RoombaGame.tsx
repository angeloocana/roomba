import React from "react";
import styled from "styled-components";
import { useRoomba, Direction } from "./useRoomba";

const Grid = styled.div`
    border: 2px solid black;
    height: 400px;
    width: 400px;
    display: flex;
    flex-direction: row;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Cell = styled.div`
    flex: 1;
    border: 1px solid black;
    text-align: center;
    font-size: 1.3em;
`;

type RoombaContainerProps = {
    $direction: Direction;
}

const RoombaContainer = styled.div<RoombaContainerProps>`
    transform: rotate(${props => getAngle(props.$direction)});
`;

export function RoombaGame() {
    const { turnRight, moveForward, grid } = useRoomba();

    return (
        <div>
            <div>
                <button onClick={turnRight}>
                    Turn right
                </button>
                <button onClick={moveForward}>
                    Move forward
                </button>
            </div>
            <Grid>
                {
                    grid.map((column, x) => (
                        <Column key={`${x}`}>
                        {
                            column.map((cell, y) => (
                                <Cell key={`${x}${y}`}>
                                    {cell.hasRoomba && (
                                        <RoombaContainer $direction={cell.roombaDirection}>
                                            {`👆`}
                                        </RoombaContainer>
                                    )}
                                </Cell>
                            ))
                        }                            
                        </Column>
                    ))
                }                
            </Grid>
        </div>
    );
}

function getAngle(direction: Direction): string {
    switch(direction) {
        case "bottom": return "180deg";
        case "left": return "270deg";
        case "right": return "90deg";
        case "top": return "0deg";
    }
}
