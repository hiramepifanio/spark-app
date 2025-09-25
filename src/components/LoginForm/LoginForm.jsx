import styles from './LoginForm.module.css'
import Form from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../Input/Input'
import { use, useState } from 'react'
import LoginAndSignupFormFooter from '../LoginAndSignupFormFooter/LoginAndSignupFormFooter'
import { AuthContext } from '../../contexts/AuthContext'

export default function LoginForm() {
  const { authDispatch } = use(AuthContext)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const { email, password } = Object.fromEntries(formData.entries())

    authDispatch({
      type: 'LOGIN',
      payload: {
        user: { id: 1, firstName: 'Hiram', lastName: 'Epifanio', email },
        tokens: {
          access: 'some-access-token',
          refresh: 'some-refresh-token'
        }
      }
    })

    navigate('/dashboard')
  }

  return (
    <Form 
      title='Bem-vindo de Volta!'
      subtitle='Gerencie seus projetos de inovação de forma intuitiva.'
      onSubmit={handleSubmit}
    >
      <Input id='email' name='email' label='email' placeholder='Informe seu email...' type='email' required error={errors.email}/>
      <Input id='password' name='password' label='Senha' placeholder='Informe seu senha...' type='password' required minLength={3} error={errors.password}/>
      <Button isFilled>Entrar</Button>
      <LoginAndSignupFormFooter text='Não possui cadastro?' redirectPath='/signup' callToAction='Cadastrar'/>
    </Form>
  )
}