import Tooltip from "../Tooltip";
import styles from "./index.module.scss";

// generic chip component with text and icon
const Chip = ({ text, icon, mini = false, tooltip }) => (
  <Tooltip content={tooltip}>
    <span className={styles.chip} data-mini={mini}>
      {icon && <i className={icon} />}
      {text}
    </span>
  </Tooltip>
);

export default Chip;
