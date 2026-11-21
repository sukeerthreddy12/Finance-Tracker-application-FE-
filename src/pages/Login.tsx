import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomBox from '../components/CustomBox'
import CustomText from '../components/CustomText'
import LoginService from '../api/LoginService'
import { SERVER_BASE_URL } from '../api/config'
import { storage } from '../utils/storage'
import styles from './Login.module.css'

const loginBox = {
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

const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [, setLoggedIn] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const loginService = new LoginService()
  const navigate = useNavigate()

  const refreshToken = async () => {
    console.log('Inside Refresh token')
    const token = storage.getItem('refreshToken')
    const response = await fetch(`${SERVER_BASE_URL}/auth/v1/refreshToken`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        token,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      storage.setItem('accessToken', data['accessToken'])
      storage.setItem('refreshToken', data['token'])
      console.log(
        'Tokens after refresh are ' +
          storage.getItem('refreshToken') +
          ' ' +
          storage.getItem('accessToken'),
      )
    }

    return response.ok
  }

  const gotoHomePageWithLogin = async () => {
    setError(null)
    try {
      const response = await fetch(`${SERVER_BASE_URL}/auth/v1/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      })
      if (response.ok) {
        const data = await response.json()
        storage.setItem('refreshToken', data['token'])
        storage.setItem('accessToken', data['accessToken'])
        navigate('/home')
      } else {
        setError('Login failed. Check username/password or API URL.')
      }
    } catch (err) {
      console.error(err)
      setError('Could not reach API. You can edit VITE_API_BASE_URL in .env later.')
    }
  }

  const gotoSignup = () => {
    navigate('/signup')
  }

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const isLogged = await loginService.isLoggedIn()
        setLoggedIn(isLogged)
        if (isLogged) {
          navigate('/home')
        } else {
          const refreshed = await refreshToken()
          setLoggedIn(refreshed)
          if (refreshed) {
            navigate('/home')
          }
        }
      } catch (err) {
        console.error(err)
      }
    }
    handleLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.loginContainer}>
      <CustomBox style={loginBox}>
        <CustomText className={styles.heading} style={{ fontSize: 24, fontWeight: 'bold' }}>
          Login
        </CustomText>

        <input
          className={styles.textInput}
          placeholder="User Name"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <input
          className={styles.textInput}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </CustomBox>

      {error && <p className={styles.error}>{error}</p>}

      <button type="button" className={styles.button} onClick={gotoHomePageWithLogin}>
        <CustomBox style={buttonBox}>
          <CustomText style={{ textAlign: 'center', display: 'block' }}>Submit</CustomText>
        </CustomBox>
      </button>

      <button type="button" className={styles.button} onClick={gotoSignup}>
        <CustomBox style={buttonBox}>
          <CustomText style={{ textAlign: 'center', display: 'block' }}>Goto Signup</CustomText>
        </CustomBox>
      </button>
    </div>
  )
}

export default Login
