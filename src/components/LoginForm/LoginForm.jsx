import styles from './LoginForm.module.css'
import Form from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../Input/Input'
import { use, useContext, useState } from 'react'
import LoginAndSignupFormFooter from '../LoginAndSignupFormFooter/LoginAndSignupFormFooter'
import { AuthContext } from '../../contexts/AuthContext'
import { NotificationContext } from '../../contexts/NotificationContext'

export default function LoginForm() {
  const { addErrorNotification } = useContext(NotificationContext)
  const { authDispatch } = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    setErrors({})

    const formData = new FormData(event.target)
    const { email, password } = Object.fromEntries(formData.entries())

    let res = null
    let resData = null
    try {
      res = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      resData = await res.json()
    } catch (error) {
      addErrorNotification(error.message)
      return
    }

    if (res.status === 400) {
      setErrors(resData)
      return
    }

    if (res.status === 401) {
      addErrorNotification('Usuário ou senha incorretos')
      return
    }

    authDispatch({
      type: 'LOGIN',
      payload: resData
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