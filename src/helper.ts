import {
    horizontal1,
    horizontal2,
    horizontal3,
    vertical1,
    vertical2,
    vertical3,
    diaganol1,
    diaganol2
} from './constants';

export const initializeBoard = (): Array<Array<string>> => {
    const rows = [];
    
    for (let x = 0; x < 3; x++) {
        rows.push(['', '', '']);
    }

    return rows;
}

export const checkBoardStatus = (board: string[][]): Array<Array<number>> => {
    function checkForWinner(board: string[][], template: number[][]): boolean {
        let square = '';

        for (let x = 0; x < template.length; x++) {
            const current = board[template[x][0]][template[x][1]];

            if (current === '' || (square !== '' && current !== square)) {
                return false;
            } else {
                square = current;
            }
        }

        return true;
    }

    if (checkForWinner(board, horizontal1)) {
        return horizontal1;
    } else if (checkForWinner(board, horizontal2)) {
        return horizontal2;
    } else if (checkForWinner(board, horizontal3)) {
        return horizontal3;
    } else if (checkForWinner(board, vertical1)) {
        return vertical1;
    } else if (checkForWinner(board, vertical2)) {
        return vertical2;
    } else if (checkForWinner(board, vertical3)) {
        return vertical3;
    } else if (checkForWinner(board, diaganol1)) {
        return diaganol1;
    } else if (checkForWinner(board, diaganol2)) {
        return diaganol2;
    }

    return [];
}