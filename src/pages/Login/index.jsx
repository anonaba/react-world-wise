import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import PageNav from '../../components/PageNav'
import { useAuth } from '../../contexts/FakeAuthContext'
import styles from './Login.module.css'

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const { login, isAthenticated, error } = useAuth()
  const [email, setEmail] = useState('jack@example.com')
  const [password, setPassword] = useState('qwerty')
  const navigate = useNavigate()

  useEffect(() => {
    //if (isAthenticated) navigate('/app') //this code wont let you go back to where you were after login
    if (isAthenticated) navigate('/app', { replace: true })
    // else navigate('/')
  }, [isAthenticated, navigate])

  function handleSubmit(e) {
    e.preventDefault()

    if (email && password) login(email, password)
  }

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        {error ? (
          <p style={{ color: 'red', fontSize: '1.6rem' }}>{error}</p>
        ) : (
          ''
        )}
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">submit</Button>
        </div>
      </form>
    </main>
  )
}
