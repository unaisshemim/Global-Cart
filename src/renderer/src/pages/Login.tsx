// LoginPage.tsx
import styled from 'styled-components'
import LoginForm from '../components/LoginForm'
// import backgroundImage from './path/to/background.jpg'; // Replace with your image path

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${'https://repository-images.githubusercontent.com/688957850/76a0e5d1-16c6-469c-8970-8d433228a5f5'});
  background-size: cover;
  background-position: center;
`

const LoginPanel = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const LoginPage = (): JSX.Element => {
  return (
    <Container>
      <LoginPanel>
        <h2>Login</h2>
        <LoginForm email="unais_shemim" password="afdfa" />
      </LoginPanel>
    </Container>
  )
}

export default LoginPage
