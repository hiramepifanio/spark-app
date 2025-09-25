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

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const { firstName, lastName, email, password, passwordConfirmation} = Object.fromEntries(formData.entries())

    if (passwordConfirmation !== password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordConfirmation: 'As senhas devem ser iguais.'
      }))
      return
    }

    authDispatch({
      type: 'LOGIN',
      payload: {
        user: { id: 1, firstName, lastName, email },
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