import { useEffect, useState } from 'react'
import styles from './ExpenseTrackerGraph.module.css'

const ExpenseTrackerGraph = () => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => setValue(85), 100)
    const done = window.setTimeout(() => setValue(50), 3100)
    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(done)
    }
  }, [])

  return (
    <div className={styles.wrap}>
      <div
        className={styles.circle}
        style={{
          background: `conic-gradient(#2ecc71 0% ${value}%, rgba(46, 204, 113, 0.2) ${value}% 100%)`,
        }}
      >
        <div className={styles.inner}>{value}%</div>
      </div>
    </div>
  )
}

export default ExpenseTrackerGraph
