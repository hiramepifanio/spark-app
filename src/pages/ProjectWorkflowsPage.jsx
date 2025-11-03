import { Avatar, AvatarGroup, Box, Button, Card, CardActionArea, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Add, Delete, Edit, MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function ProjectWorkflowsPage() {
  const [projectWorkflows, setProjectWorkflows] = useState([])
  const [loading, setLoading] = useState(true);
  const { authState } = use(AuthContext)
  const token = authState.access
  const [isAddProjectWorkflowDialogOpen, setIsAddProjectWorkflowDialogOpen] = useState(false);
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchProjectWorkflows() {
      try {
        const response = await fetch("http://localhost:8000/project-workflows/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        })

        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }

        const data = await response.json()
        setProjectWorkflows(data)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectWorkflows()
  }, [])

  function handleOpenAddProjectWorkflowDialog() {
    setIsAddProjectWorkflowDialogOpen(true)
  }

  function handleCloseAddProjectWorkflowDialog() {
    setIsAddProjectWorkflowDialogOpen(false)
  }

  async function handleCreateProjectWorkflowFormSubmit(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const { name } = Object.fromEntries(formData.entries())
    
    let res = null
    let resData = null
    try {
      res = await fetch('http://localhost:8000/project-workflows/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name })
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

    if (res.status !== 201) {
      enqueueSnackbar('Houve algum erro durante a criação de novo worflow de projeto', { variant: 'error' })
      console.log(resData)
      return
    }

    setProjectWorkflows([...projectWorkflows, resData])
    handleCloseAddProjectWorkflowDialog()
    navigateToProjectWorkflowPage(resData.id)
    enqueueSnackbar('Workflow adicionado com sucesso', { variant: 'success' })
  }

  function navigateToProjectWorkflowPage(id) {
    navigate(`/project-workflows/${id}`)
  }

  return (
    <>
      <Toolbar className="!px-0" >
        <Typography variant="h4" component={'h1'}>Workflows</Typography>
        <Box className='grow' />
        <Button onClick={handleOpenAddProjectWorkflowDialog} variant="contained" startIcon={<Add />}>
          Adicionar Workflow
        </Button>
      </Toolbar>
      {!loading && projectWorkflows.length === 0 && (
        <Box
          className="flex flex-col items-center justify-center !py-20 text-center !border-2 border-dashed !border-gray-300 rounded-2xl"
        >
          <Typography variant="h6" gutterBottom color="text.secondary">
            Nenhum workflow encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary" className="max-w-sm !mb-4">
            Esta organização ainda não possui workflows. Crie o primeiro workflow para começar a gerenciar o fluxo dos seus projetos.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={() => handleOpenAddProjectWorkflowDialog()}
          >
            Adicionar Workflow
          </Button>
        </Box>
      )}
      <Grid container spacing={2} mt={1}>
        {projectWorkflows.map(pw => (
          <Grid key={pw.id} size={3}>
            <Card className="!h-30">
              <CardActionArea onClick={() => navigateToProjectWorkflowPage(pw.id)} className="h-full">
                <CardContent className="flex">
                  <Stack direction={'row'} className="grow flex items-center">
                    <Avatar className="!mr-2">{pw.name.split(' ').map(word => word[0].toUpperCase())}</Avatar>
                    <Typography component="span" variant="h6" className="grow">
                      {pw.name}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog 
        open={isAddProjectWorkflowDialogOpen} 
        onClose={handleCloseAddProjectWorkflowDialog} 
        disableRestoreFocus
      >
        <DialogTitle>Adicionar workflow</DialogTitle>
        <DialogContent className="w-md" >
          <DialogContentText mb={2}>
            Crie um novo workflow para gerenciar seus projetos
          </DialogContentText>
          <Box component="form" onSubmit={handleCreateProjectWorkflowFormSubmit} id="subscription-form">
            <TextField
              id="name"
              name="name"
              label="Nome"
              placeholder="Digite o nome do workflow"
              type="text"
              required
              autoFocus
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseAddProjectWorkflowDialog}>Cancelar</Button>
          <Button variant="contained" type="submit" form="subscription-form">
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}