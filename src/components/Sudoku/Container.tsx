import { Sudoku } from "./Sudoku";
import styles from "./Container.module.css";
import { useState } from "react";

const initialBoard = [
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

export function Container() {
  const [isStart, setIsStart] = useState(false);

  const handleStart = () => {
    setIsStart(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <Sudoku
          name="JavaScript"
          initialBoard={initialBoard}
          isStart={isStart}
        ></Sudoku>
        <Sudoku
          name="WebAssembly"
          initialBoard={initialBoard}
          isStart={isStart}
        ></Sudoku>
      </div>
      <div className={styles.btnBox}>
        <button onClick={handleStart} className={styles.btn}>
          START
        </button>
      </div>
    </div>
  );
}
