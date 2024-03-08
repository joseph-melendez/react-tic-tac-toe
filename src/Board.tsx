import { ReactElement, useState } from "react";
import './Board.css';
import {
    checkBoardStatus,
    initializeBoard
} from "./helper";
import {
    totalSquares,
    xValue,
    oValue
} from './constants'

export const Board = () => {
    const [board, setBoard] = useState(initializeBoard());
    const [turn, setTurn] = useState(xValue);
    const [isGameOver, setIsGameOver] = useState(false);
    const [winningSquares, setWinningSquares] = useState<Array<Array<number>>>([]);
    const [remainingSquares, setRemainingSquares] = useState(totalSquares);

    const handleClick = (row: number, col: number): void => {
        // Don't allow a cell to be clicked if it already has a value or the game is over
        if (board[row][col] !== '' || isGameOver) {
            return;
        }

        // Set the clicked square.
        board[row][col] = (turn === xValue) ? xValue : oValue;
        setBoard(board);
        setRemainingSquares(remainingSquares - 1);

        // Check to see if there is a win or tie
        const winningSquares = checkBoardStatus(board);

        if (winningSquares.length !== 0) {
            setWinningSquares(winningSquares); 
            setIsGameOver(true);
        } else if (remainingSquares - 1 <= 0) {
            setIsGameOver(true);
        } else {
            // Next players turn
            setTurn(nextPlayersTurn());
        }
    }

    const nextPlayersTurn = (): string => {
        return (turn === xValue) ? oValue : xValue
    }

    const resetBoard = (): void => {
        setBoard(initializeBoard());
        setTurn(nextPlayersTurn());
        setIsGameOver(false);
        setRemainingSquares(totalSquares);
        setWinningSquares([]);
    }

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

    const gameStatus = (): ReactElement => {
        if (!isGameOver) {
            return <>{turn}&apos;s Turn</>
        } else if (winningSquares.length > 0) {
            return <>{turn} wins!</>
        } else {
            return <>It&apos;s a tie</>
        }
    }

    return (
        <div>
            <div>
                
                <b>{gameStatus()}</b>
            </div>
            {
                board && board.map((row, rIndex) => (
                    <div key={rIndex} className="ticRow">
                        {
                            row.map((column, cIndex) => (
                                <div key={cIndex} className={getSquareClassNames(rIndex, cIndex)} onClick={() => handleClick(rIndex, cIndex)}>
                                    {column}
                                </div>
                            ))
                        }
                    </div>
                ))
            }
            <div className="gameOver">
                {
                    isGameOver &&
                        <a className="playAgain" onClick={resetBoard}>Play Again?</a>
                }
            </div>
        </div>
    );
}

