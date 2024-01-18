import { useState } from "react";
import { sleep } from "../utils";

const sleep200ms = sleep(200);

type Board = number[][];

interface IsValid {
  board: Board;
  r: number;
  c: number;
  num: number;
}

export function useSolveSudoku(initialBoard: Board) {
  const [board, setBoard] = useState([...initialBoard]);

  const solveSudoku = async () => {
    const pos = emptyPos();
    if (pos.length === 0) {
      return true;
    }
    const [r, c] = pos;
    for (let num = 1; num <= 9; num++) {
      if (isValid({ board, r, c, num })) {
        board[r][c] = num;

        await sleep200ms();

        setBoard([...board]);

        if (await solveSudoku()) {
          return true;
        }
        board[r][c] = 0;
        setBoard([...board]);
        // await sleep200ms();
      }
    }
  };

  const emptyPos = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) return [r, c];
      }
    }

    return [];
  };

  const isValid = ({ r, c, num }: IsValid) => {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === num) {
        return false;
      }
    }

    for (let i = 0; i < 9; i++) {
      if (board[i][c] === num) {
        return false;
      }
    }
    const startRow = Math.floor(r / 3) * 3;
    const startCol = Math.floor(c / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }
    return true;
  };

  return { board, solveSudoku };
}
