import styles from './SignupForm.module.css'
import Form from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import TextInput from '../../components/TextInput/TextInput'
import { useState } from 'react'

export default function SignupForm() {
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
      title='Crie uma conta'
      subtitle='Gerencie seus projetos de inovação de forma intuitiva.'
      onSubmit={handleSubmit}
    >
      <div className={styles.fistNameAndLastNameFieldsContainer}>
        <TextInput id='firstName' label='Nome' placeholder='Informe seu nome...' required minLength={3} maxLength={50} error={errors.firstName}/>
        <TextInput id='lastName' label='Sobrenome' placeholder='Informe seu sobrenome...' required minLength={3} error={errors.lastName}/>
      </div>
      <TextInput id='email' label='email' placeholder='Informe seu email...' type='email' required error={errors.email}/>
      <TextInput id='password' label='Senha' placeholder='Informe seu senha...' type='password' required minLength={3} error={errors.password}/>
      <TextInput id='passwordConfirmation' label='Confirmação de senha' placeholder='Informe seu senha novamente...' type='password' required minLength={3} error={errors.passwordConfirmation}/>
      <Button isFilled>Cadastrar</Button>
      <p className={styles.footer}>Já possui cadastro? <Link to='/login' className={styles.link}>Entrar</Link></p>
    </Form>
  )
}