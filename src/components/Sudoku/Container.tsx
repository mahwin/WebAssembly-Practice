import { Sudoku } from "./Sudoku";
import styles from "./Container.module.css";

export function Container() {
  return (
    <div className={styles.container}>
      <Sudoku name="JavaScript"></Sudoku>
      <Sudoku name="WebAssembly"></Sudoku>
    </div>
  );
}
