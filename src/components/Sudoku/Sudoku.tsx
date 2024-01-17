import styles from "./Sudoku.module.css";

import { useSolveSudoku } from "../../hooks/useSolveSudoku";

const instalBoard = [
  [0, 0, 0, 7, 5, 0, 0, 0, 2],
  [3, 2, 7, 0, 0, 1, 0, 6, 0],
  [1, 6, 0, 0, 0, 0, 0, 0, 9],
  [2, 0, 0, 0, 7, 5, 0, 3, 0],
  [6, 0, 3, 1, 0, 4, 5, 0, 8],
  [0, 1, 0, 6, 3, 0, 0, 0, 4],
  [7, 0, 0, 0, 0, 0, 0, 5, 3],
  [0, 3, 0, 5, 0, 0, 4, 9, 6],
  [9, 0, 0, 0, 6, 3, 0, 0, 0],
];

export function Sudoku({ name }: { name: string }) {
  const { board } = useSolveSudoku([...instalBoard]);

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
                    <span className={styles.text}>
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
