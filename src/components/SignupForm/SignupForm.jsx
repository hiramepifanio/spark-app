import styles from './SignupForm.module.css'
import Form from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import { use, useState } from 'react'
import LoginAndSignupFormFooter from '../LoginAndSignupFormFooter/LoginAndSignupFormFooter'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function SignupForm() {
  const { authDispatch } = use(AuthContext)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    setErrors({})

    const formData = new FormData(event.target)
    const { firstName, lastName, email, password, passwordConfirmation} = Object.fromEntries(formData.entries())

    if (passwordConfirmation !== password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordConfirmation: 'As senhas devem ser iguais.'
      }))
      return
    }

    const res = await fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password })
    })

    const resData = await res.json()

    if (res.status === 400) {
      setErrors(resData)
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
      title='Crie uma conta'
      subtitle='Gerencie seus projetos de inovação de forma intuitiva.'
      onSubmit={handleSubmit}
    >
      <div className={styles.fistNameAndLastNameFieldsContainer}>
        <Input id='firstName' name='firstName' type='text' label='Nome' placeholder='Informe seu nome...' required minLength={3} maxLength={50} error={errors.firstName}/>
        <Input id='lastName' name='lastName' type='text' label='Sobrenome' placeholder='Informe seu sobrenome...' required minLength={3} error={errors.lastName}/>
      </div>
      <Input id='email' name='email' label='email' placeholder='Informe seu email...' type='email' required error={errors.email}/>
      <Input id='password' name='password' label='Senha' placeholder='Informe seu senha...' type='password' required minLength={3} error={errors.password}/>
      <Input id='passwordConfirmation' name='passwordConfirmation' label='Confirmação de senha' placeholder='Informe seu senha novamente...' type='password' required minLength={3} error={errors.passwordConfirmation}/>
      <Button isFilled>Cadastrar</Button>
      <LoginAndSignupFormFooter text='Já possui cadastro?' redirectPath='/login' callToAction='Entrar'/>
    </Form>
  )
}