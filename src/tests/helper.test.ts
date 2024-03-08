import { checkBoardStatus, initializeBoard } from "../helper";
import {
    horizontal1,
    horizontal2,
    horizontal3,
    vertical1,
    vertical2,
    vertical3,
    diaganol1,
    diaganol2
} from '../constants'


describe('helper.test.ts -> Test board configurations', () => {
    it("Board initialized", () => {
        const board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];

        expect(initializeBoard()).toEqual(board);
    });

    it("No winner", () => {
        const board = [
            ['X', '0', 'X'],
            ['O', 'X', ''],
            ['', '', ''],
        ];

        expect(checkBoardStatus(board)).toEqual([]);
    });

    it("Winner horizontally 1", () => {
        const board = [
            ['X', 'X', 'X'],
            ['', '', ''],
            ['', '', ''],
        ];

        expect(checkBoardStatus(board)).toEqual(horizontal1);
    });

    it("Winner horizontally 2", () => {
        const board = [
            ['', '', ''],
            ['X', 'X', 'X'],
            ['', '', ''],
        ];

        expect(checkBoardStatus(board)).toEqual(horizontal2);
    });

    it("Winner horizontally 3", () => {
        const board = [
            ['', '', ''],
            ['', '', ''],
            ['X', 'X', 'X'],
        ];

        expect(checkBoardStatus(board)).toEqual(horizontal3);
    });

    it("Winner vertically 1", () => {
        const board = [
            ['X', '', ''],
            ['X', '', ''],
            ['X', '', ''],
        ];

        expect(checkBoardStatus(board)).toEqual(vertical1);

    });

    it("Winner vertically 2", () => {
        const board = [
            ['', 'X', ''],
            ['', 'X', ''],
            ['', 'X', ''],
        ];

        expect(checkBoardStatus(board)).toEqual(vertical2);
    });

    it("Winner vertically 3", () => {
        const board = [
            ['', '', 'X'],
            ['', '', 'X'],
            ['', '', 'X'],
        ];

        expect(checkBoardStatus(board)).toEqual(vertical3);
    });

    it("Winner diaganolly 1", () => {
        const board = [
            ['X', '', ''],
            ['', 'X', ''],
            ['', '', 'X'],
        ];

        expect(checkBoardStatus(board)).toEqual(diaganol1);
    });

    it("Winner diaganolly 2", () => {
        const board = [
            ['', '', 'X'],
            ['', 'X', ''],
            ['X', '', ''],
        ];

        expect(checkBoardStatus(board)).toEqual(diaganol2);
    });

    it("Tie", () => {
        const board = [
            ['X', 'X', 'O'],
            ['O', 'O', 'X'],
            ['X', 'X', '0'],
        ];

        expect(checkBoardStatus(board)).toEqual([]);
    });
});
