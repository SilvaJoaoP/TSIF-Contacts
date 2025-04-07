import styles from "./styles.module.css";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button className={styles.button} {...props} />;
}
