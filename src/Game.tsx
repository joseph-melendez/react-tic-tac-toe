import { ReactElement, useState } from "react";
import './Game.css';
import {
    checkBoardStatus,
    initializeBoard
} from "./helper";
import {
    totalSquares,
    xValue,
    oValue
} from './constants'
import { Board } from "./Board";

export const Game = () => {
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
            <Board
                board={board}
                winningSquares={winningSquares}
                remainingSquares={remainingSquares}
                handleClick={handleClick}
            />
            <div className="gameOver">
                {
                    isGameOver &&
                        <a className="playAgain" onClick={resetBoard}>Play Again?</a>
                }
            </div>
        </div>
    );
}

