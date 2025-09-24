import styles from './LoginForm.module.css'
import Form from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import Input from '../Input/Input'
import { useState } from 'react'
import LoginAndSignupFormFooter from '../LoginAndSignupFormFooter/LoginAndSignupFormFooter'

export default function LoginForm() {
  const [errors, setErrors] = useState({})

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    console.log(data)

    if (data.passwordConfirmation !== data.password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordConfirmation: 'As senhas devem ser iguais.'
      }))
    }
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