import { Sudoku } from "./Sudoku";
import styles from "./Container.module.css";
import { useState } from "react";
import { jsWorker } from "../../worker/js";
import { wasmWorker } from "../../worker/wasm";

const 수도쿠문제 = `G0F01B030C00802A0B8002EA001590D6690A00C00GD00170102007608009E0G0D70G90820060B0A100600G01002A0098B09000AEF10G6245A0120040C9700G30FG04A0B7020619C396D0201G070C008000A0095D00F10060020160FCA098G00D000901G600A0D0B240G0B00006020A190A06002910G0580721000A00900B40FG`;

export function Container() {
  const [isStart, setIsStart] = useState(false);

  const handleStart = () => {
    setIsStart(true);
  };

  return (
    <div className={styles.wrapper}>
      <span></span>
      <div className={styles.box}>
        <Sudoku
          name="JavaScript"
          problem={수도쿠문제}
          isStart={isStart}
          worker={jsWorker}
        ></Sudoku>
        <Sudoku
          name="WebAssembly"
          problem={수도쿠문제}
          isStart={isStart}
          worker={wasmWorker}
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
