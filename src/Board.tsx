import { ReactElement } from "react";
import { Square } from "./Square";
import "./Board.css";

interface BoardProps {
    board: Array<Array<string>>;
    winningSquares: Array<Array<number>>;
    remainingSquares: number;
    handleClick: (row: number, column: number) => void;
}

export const Board = ({ board, winningSquares, remainingSquares, handleClick }: BoardProps): ReactElement => {
    return (
        <>
            {
                board && board.map((row, rIndex) => (
                    <div key={rIndex} className="ticRow">
                        {
                            row.map((_, cIndex) => (
                                <Square
                                    row={rIndex}
                                    column={cIndex}
                                    board={board}
                                    winningSquares={winningSquares}
                                    remainingSquares={remainingSquares}
                                    handleClick={handleClick}
                                />
                            ))
                        }
                    </div>
                ))
            }

        </>
    );
}
