import ReactDOM from "react-dom";
import { ILoaderProps } from "./types";
import styles from "./styles.module.css";
import { useMemo } from "react";

export default function Loader({ isLoading }: ILoaderProps) {
  const loaderArray = useMemo(() => "CODEMETRICS".split(""), []);

  if (!isLoading) return null;

  return ReactDOM.createPortal(
    <div className={styles.loader}>
      <p>
        {loaderArray.map((letter) => (
          <span key={letter} className={styles.letter}>
            {letter}
          </span>
        ))}
      </p>
    </div>,
    document.getElementById("global")!
  );
}
