import styles from './footer.module.scss'

export default function footer() {
  return (
    <footer className={styles.footer}>
        <div>Made by:</div>
        <div>
            <ul className={styles.list}>
                <li>Hayder Sarhan</li>
                <li>Mohamad Nour Shahin</li>
                <li>Jahongir Hayitov</li>
                <li>Aruzhan Shinbayeva</li>
            </ul>
        </div>
    </footer>
  )
}
