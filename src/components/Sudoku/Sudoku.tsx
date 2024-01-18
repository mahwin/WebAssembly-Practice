import styles from "./Sudoku.module.css";

import { useSolveSudoku } from "../../hooks/useSolveSudoku";
import { useEffect, useState } from "react";
import { timer, deepCopyArr2D } from "../../utils";

type Board = number[][];
interface SudokuProps {
  name: string;
  initialBoard: Board;
  isStart: boolean;
}

export function Sudoku({ name, initialBoard, isStart }: SudokuProps) {
  const { board, solveSudoku } = useSolveSudoku(deepCopyArr2D(initialBoard));
  const [prevBoard] = useState(deepCopyArr2D(initialBoard));

  const isDefault = (r: number, c: number) => {
    if (prevBoard[r][c] !== 0 && board[r][c] === prevBoard[r][c]) return true;
    return false;
  };

  useEffect(() => {
    if (!isStart) return;

    (async () => {
      const time = await timer(solveSudoku);
      console.log(time.toFixed(2));
    })();
  }, [isStart]);

  return (
    <article>
      <table className={styles.table}>
        <caption className={styles.caption}>
          <h1>{name}</h1>
        </caption>
        <tbody className={styles.tbody}>
          {Array.from({ length: 9 }, (_, i) => (
            <tr className={styles.tr} key={i}>
              {Array.from({ length: 9 }, (_, j) => (
                <td className={styles.td} key={j}>
                  <div className={styles.cell}>
                    <span
                      className={`${styles.text} ${
                        isDefault(i, j) ? styles.default : ""
                      }`}
                    >
                      {board[i][j] !== 0 ? board[i][j] : ""}
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
