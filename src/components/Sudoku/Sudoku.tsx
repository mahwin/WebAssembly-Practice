import styles from "./Sudoku.module.css";

import { useEffect, useMemo, useState } from "react";
import { sudokuSolve } from "../../utils";

type Board = string[][];

interface SudokuProps {
  name: string;
  initialBoard: Board;
  isStart: boolean;
}

export function Sudoku({ name, initialBoard, isStart }: SudokuProps) {
  const [board, setBoard] = useState(initialBoard);
  const [prevBoard] = useState(initialBoard);

  const len = useMemo(() => board.length, [board]);

  const isDefault = (r: number, c: number) => {
    if (prevBoard[r][c] !== "0" && board[r][c] === prevBoard[r][c]) return true;
    return false;
  };

  useEffect(() => {
    if (!isStart) return;
    const start = performance.now();
    const solvedBoard = sudokuSolve(board);
    const end = performance.now();
    console.log(`${end - start}ms`);
    console.log(solvedBoard);
    setBoard(solvedBoard);
  }, [isStart]);

  return (
    <article>
      <table className={styles.table}>
        <caption className={styles.caption}>
          <h1>{name}</h1>
        </caption>
        <tbody className={styles.tbody}>
          {Array.from({ length: len }, (_, i) => (
            <tr className={styles.tr} key={i}>
              {Array.from({ length: len }, (_, j) => (
                <td className={styles.td} key={j}>
                  <div className={styles.cell}>
                    <span
                      className={`${styles.text} ${
                        isDefault(i, j) ? styles.default : ""
                      }`}
                    >
                      {board[i][j] !== "0" ? board[i][j] : ""}
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
