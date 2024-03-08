import { ReactElement } from "react";

interface SquareProps {
    row: number;
    column: number;
    board: Array<Array<string>>;
    winningSquares: Array<Array<number>>;
    remainingSquares: number;
    handleClick: (row: number, column: number) => void;
}

export const Square = ({ row, column, board, winningSquares, remainingSquares, handleClick }: SquareProps): ReactElement => {
    const getSquareClassNames = (row: number, col: number): string => {
        let classNames = "ticCol";
    
        if (winningSquares != null && winningSquares.length > 0) {
            for (let x = 0; x < winningSquares.length; x++) {
                if (winningSquares[x][0] == row && winningSquares[x][1] == col) {
                    classNames += " win";
                }
            }
        } else if (remainingSquares === 0) {
            classNames += " tie";
        } else if (board[row][col] === '') {
            classNames += " empty";
        }
    
        return classNames;
    }

    return (
        <div key={column} className={getSquareClassNames(row, column)} onClick={() => handleClick(row, column)}>
            {board[row][column]}
        </div>
    )
}