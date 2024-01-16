import styles from "./Sudoku.module.css";

export function Sudoku({ name }: { name: string }) {
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
                    <span>{j}</span>
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
