import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomBox from '../components/CustomBox'
import CustomText from '../components/CustomText'
import { SERVER_BASE_URL } from '../api/config'
import { storage } from '../utils/storage'
import styles from './Login.module.css'

const signUpBox = {
  mainBox: {
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
  },
  shadowBox: {
    backgroundColor: 'gray',
    borderRadius: 10,
  },
}

const buttonBox = {
  mainBox: {
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  shadowBox: {
    backgroundColor: 'gray',
    borderRadius: 10,
  },
}

const SignUp = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState<string | null>(null)

  const navigateToLoginScreen = async () => {
    setError(null)
    try {
      const response = await fetch(`${SERVER_BASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phoneNumber,
          password: password,
          username: userName,
        }),
      })

      const data = await response.json()
      console.log(data)
      storage.setItem('accessToken', data['accessToken'])
      storage.setItem('refreshToken', data['token'])
      navigate('/home')
    } catch (err) {
      console.error('Error during sign up:', err)
      setError('Signup failed. Check API URL in .env later.')
    }
  }

  const gotLoginWithoutValidation = () => {
    navigate('/login')
  }

  return (
    <div className={styles.loginContainer}>
      <CustomBox style={signUpBox}>
        <CustomText style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, display: 'block' }}>
          Sign Up
        </CustomText>
        <input
          className={styles.textInput}
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          className={styles.textInput}
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <input
          className={styles.textInput}
          placeholder="User Name"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <input
          className={styles.textInput}
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className={styles.textInput}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className={styles.textInput}
          placeholder="Phone Number"
          type="tel"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
      </CustomBox>

      {error && <p className={styles.error}>{error}</p>}

      <button type="button" className={styles.button} onClick={navigateToLoginScreen}>
        <CustomBox style={buttonBox}>
          <CustomText style={{ textAlign: 'center', display: 'block' }}>Sign Up</CustomText>
        </CustomBox>
      </button>
      <button type="button" className={styles.button} onClick={gotLoginWithoutValidation}>
        <CustomBox style={buttonBox}>
          <CustomText style={{ textAlign: 'center', display: 'block' }}>Login</CustomText>
        </CustomBox>
      </button>
    </div>
  )
}

export default SignUp
