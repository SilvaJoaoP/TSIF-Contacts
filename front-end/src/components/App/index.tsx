import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../../routes";
import { Header } from "../Layout";
import styles from "./styles.module.css";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.wrapper}>
        <Header />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
