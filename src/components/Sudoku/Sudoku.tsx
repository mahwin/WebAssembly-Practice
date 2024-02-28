import styles from "./Sudoku.module.css";
import { useEffect, useMemo, useState, useCallback } from "react";
import { workerInstance } from "../../worker/js";

interface SudokuProps {
  name: string;
  problem: string;
  isStart: boolean;
}

export function Sudoku({ name, problem, isStart }: SudokuProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState<null | string>(null);

  const [solvedProblem, setSolvedProblem] = useState<string>("");
  const len = useMemo(() => Math.sqrt(problem.length), [problem]);

  const isDefault = (r: number, c: number) => {
    if (problem[calIndex(r, c)] !== "0") return true;
    return false;
  };

  const calIndex = useCallback(
    (r: number, c: number) => {
      return r * len + c;
    },
    [len]
  );

  useEffect(() => {
    if (!isStart) return;
    setIsLoading(true);

    (async function () {
      const start = performance.now();

      const resultString = await workerInstance.sudokuSolve(problem);
      setSolvedProblem(resultString);
      setDuration((performance.now() - start).toFixed(0));
      setIsLoading(false);
    })();
  }, [isStart, problem]);

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
                      {!isStart || isLoading
                        ? problem[calIndex(i, j)] !== "0"
                          ? problem[calIndex(i, j)]
                          : ""
                        : solvedProblem[calIndex(i, j)]}
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.timer}>
        {isLoading && <span>Loading...</span>}
        {duration !== null && <span>{`${duration}ms`}</span>}
      </p>
    </article>
  );
}
