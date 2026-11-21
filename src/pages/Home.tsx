import ExpenseTrackerGraph from './ExpenseTrackerGraph'
import SpendsInsights from './SpendsInsights'
import Spends from './Spends'
import Nav from './Nav'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles.safeArea}>
      <div className={styles.container}>
        <Nav />
        <div className={styles.contentContainer}>
          <div className={styles.graphContainer}>
            <ExpenseTrackerGraph />
          </div>
          <div className={styles.insightsContainer}>
            <SpendsInsights />
          </div>
        </div>
        <div className={styles.spendsContainer}>
          <Spends />
        </div>
      </div>
    </div>
  )
}

export default Home
