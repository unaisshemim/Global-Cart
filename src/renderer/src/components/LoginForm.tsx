import React, { useState } from 'react'

interface LoginFormProps {
  email: string
  password: string
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    // Handle login logic here, e.g., API call
    console.log('Email:', email, 'Password:', password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <input type="checkbox" id="rememberMe" />
        <label htmlFor="rememberMe">Remember me</label>
      </div>
      <button type="submit">Login</button>
      <p>
        Don have an account? <a href="/register">Register</a>
      </p>
    </form>
  )
}

export default LoginForm
