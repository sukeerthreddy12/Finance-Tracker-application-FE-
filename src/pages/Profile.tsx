import { useNavigate } from 'react-router-dom'
import CustomBox from '../components/CustomBox'
import CustomText from '../components/CustomText'
import { storage } from '../utils/storage'
import styles from './Login.module.css'

const Profile = () => {
  const navigate = useNavigate()

  const logout = () => {
    storage.removeItem('accessToken')
    storage.removeItem('refreshToken')
    navigate('/login')
  }

  return (
    <div className={styles.loginContainer}>
      <CustomBox
        style={{
          mainBox: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
          shadowBox: { backgroundColor: 'gray' },
        }}
      >
        <CustomText style={{ fontSize: 24, fontWeight: 'bold', display: 'block', marginBottom: 12 }}>
          Profile
        </CustomText>
        <CustomText style={{ display: 'block', marginBottom: 8 }}>
          Access token present: {storage.getItem('accessToken') ? 'yes' : 'no'}
        </CustomText>
        <button type="button" className={styles.button} onClick={() => navigate('/home')}>
          <CustomBox
            style={{
              mainBox: { backgroundColor: '#fff', padding: 10, borderRadius: 10 },
              shadowBox: { backgroundColor: 'gray' },
            }}
          >
            <CustomText style={{ textAlign: 'center', display: 'block' }}>Back to Home</CustomText>
          </CustomBox>
        </button>
        <button type="button" className={styles.button} onClick={logout}>
          <CustomBox
            style={{
              mainBox: { backgroundColor: '#fff', padding: 10, borderRadius: 10 },
              shadowBox: { backgroundColor: 'gray' },
            }}
          >
            <CustomText style={{ textAlign: 'center', display: 'block' }}>Logout</CustomText>
          </CustomBox>
        </button>
      </CustomBox>
    </div>
  )
}

export default Profile
