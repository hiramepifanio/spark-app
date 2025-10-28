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
import { useSnackbar } from 'notistack';

export default function LoginPage() {
  const { authDispatch } = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();
  
  async function handleSubmit(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const { email, password } = Object.fromEntries(formData.entries())
    
    let res = null
    let resData = null
    try {
      res = await fetch('http://localhost:8000/token/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      resData = await res.json()
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }

    if (res.status === 400) {
      setErrors(resData)
      return
    }

    if (res.status === 401) {
      enqueueSnackbar('Usuário ou senha incorretos', { variant: 'error' })
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
      <Box sx={{ flexGrow: 1 }} />
      <Paper elevation={10} className="!p-4">
        <Typography component="h1" variant="h5" className="!mb-2">
          Entrar
        </Typography>
        <Typography component="p" variant="p" className="!mb-8">
          Gerencie seus projetos de inovação de forma intuitiva.
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack direction={'column'} gap={2}>
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
          <Button type="submit" variant="contained">
            Entrar
          </Button>
          </Stack>
        </Box>
        <Stack direction={'row'} justifyContent="space-between" className="!mt-4" >
          <Link component={RouterLink} to="/forgot">
            Esqueceu a senha?
          </Link>
          <Link component={RouterLink} to="/register">
            Cadastrar
          </Link>
        </Stack>
      </Paper>
      <Box sx={{ flexGrow: 1 }} />
    </Container>
  );
};