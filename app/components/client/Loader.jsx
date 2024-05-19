import styles from "../../styles/Loader.module.css"

export default function Loader({ className }) {
  return (
    <div className={`${styles.loader} ${className}`}></div>
  )
}
