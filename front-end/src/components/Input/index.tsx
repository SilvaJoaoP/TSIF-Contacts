import styles from "./styles.module.css";

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input className={styles.input} {...props} />;
}
