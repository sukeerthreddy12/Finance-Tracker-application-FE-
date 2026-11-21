import { useNavigate } from 'react-router-dom'
import CustomText from '../components/CustomText'
import styles from './Nav.module.css'

function Nav() {
  const navigate = useNavigate()

  const handleProfilePress = () => {
    navigate('/profile')
  }

  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <CustomText>Logo</CustomText>
        <CustomText>ExpenseTrackerApp</CustomText>
      </div>
      <button type="button" className={styles.avatarButton} onClick={handleProfilePress}>
        <img
          className={styles.avatar}
          alt="profile"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
        />
      </button>
    </div>
  )
}

export default Nav
