import { strToTwoDArr, twoDArrToStr } from "./";

type Problem = string;

type Board = string[][];

interface IsValid {
  board: Board;
  r: number;
  c: number;
  num: string;
}

export const sudokuSolve = (problem: Problem) => {
  const board = strToTwoDArr(problem);
  const len = board.length;
  const divider = Math.floor(Math.sqrt(len));

  const numbers = Array.from({ length: len }, (_, i) => {
    if (i + 1 < 10) return String(i + 1);
    else return String.fromCharCode(65 + (i + 1 - 10));
  });

  let isFinish = false;

  const solve = () => {
    if (isFinish) return;
    const pos = emptyPos();

    if (pos.length === 0) {
      isFinish = true;
      return;
    }
    const [r, c] = pos;
    for (const num of numbers) {
      if (isValid({ board, r, c, num })) {
        board[r][c] = num;
        solve();
        if (isFinish) return;
        board[r][c] = "0";
      }
    }
  };
  const emptyPos = () => {
    for (let r = 0; r < len; r++) {
      for (let c = 0; c < len; c++) {
        if (board[r][c] === "0") return [r, c];
      }
    }

    return [];
  };

  const isValid = ({ r, c, num }: IsValid) => {
    for (let i = 0; i < len; i++) {
      if (board[r][i] === num) {
        return false;
      }
    }

    for (let i = 0; i < len; i++) {
      if (board[i][c] === num) {
        return false;
      }
    }
    const startRow = Math.floor(r / divider) * divider;
    const startCol = Math.floor(c / divider) * divider;

    for (let i = 0; i < divider; i++) {
      for (let j = 0; j < divider; j++) {
        if (board[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }
    return true;
  };
  solve();
  return twoDArrToStr(board);
};
