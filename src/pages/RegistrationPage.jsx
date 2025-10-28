import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Link,
  Stack,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function RegistrationPage() {
  const { authDispatch } = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  
  async function handleSubmit(event) {
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

    const res = await fetch('http://localhost:8000/register/', {
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
    <Container className="!max-w-xl flex flex-col h-screen">
      <Box className="grow" />
      <Paper elevation={10} className="!p-4">
        <Typography component="h1" variant="h5" className="!mb-2">
          Crie uma conta
        </Typography>
        <Typography component="p" variant="p" className="!mb-8">
          Gerencie seus projetos de inovação de forma intuitiva.
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack direction={'column'} gap={2}>
            <Stack direction={'row'} gap={2}>
              <TextField
                id="firstName"
                name="firstName"
                label='Nome'
                placeholder="Digite seu nome"
                type="text"
                required
                autoFocus
                className="grow"
                error={errors.firstName}
                helperText={errors.firstName ? errors.firstName : null}
              />
              <TextField
                id="lastName"
                name="lastName"
                label='Sobrenome'
                placeholder="Digite seu sobrenome"
                type="text"
                required
                autoFocus
                className="grow"
                error={errors.lastName}
                helperText={errors.lastName ? errors.lastName : null}
              />
            </Stack>
            <TextField
              id="email"
              name="email"
              label='Email'
              placeholder="Digite seu email"
              type="email"
              required
              autoFocus
                error={errors.email}
                helperText={errors.email ? errors.email : null}
            />
            <TextField
              id="password"
              name="password"
              label='Senha'
              placeholder="Digite sua senha"
              required
              type="password"
                error={errors.password}
                helperText={errors.password ? errors.password : null}
            />
            <TextField
              id="passwordConfirmation"
              name="passwordConfirmation"
              label='Confirmação de senha'
              placeholder="Digite sua senha novamente"
              required
              type="password"
                error={errors.passwordConfirmation}
                helperText={errors.passwordConfirmation ? errors.passwordConfirmation : null}
            />
          <Button type="submit" variant="contained">
            Cadastrar
          </Button>
          </Stack>
        </Box>
        <Stack direction={'row'} className="!mt-4 items-center" >
          <Typography mr={1}>Já possui uma conta?</Typography>
          <Link component={RouterLink} to="/login">
            Entrar
          </Link>
        </Stack>
      </Paper>
      <Box className="grow" />
    </Container>
  );
};