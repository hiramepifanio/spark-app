import { Avatar, AvatarGroup, Box, Button, Card, CardActionArea, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Add, Delete, Edit, MoreVert } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { useSnackbar } from "notistack";

export default function ProjectWorkflowPage() {
  const { projectWorkflowId } = useParams();

  const [projectWorkflow, setProjectWorkflow] = useState(null)
  const [stages, setStages] = useState([])

  const [loading, setLoading] = useState(true);
  
  const [isDeleteStageDialogOpen, setIsDeleteStageDialogOpen] = useState(false)
  const [isAddEditStageDialogOpen, setIsAddEditStageDialogOpen] = useState(false)
  const [targetStage, setTargetStage] = useState(null)

  const [isEditWorkflowDialogOpen, setIsEditWorkflowDialogOpen] = useState(false)

  const { enqueueSnackbar } = useSnackbar();
  const { authState } = use(AuthContext)
  const token = authState.access

  useEffect(() => {
    async function fetchProjectWorkflow(id) {
      try {
        const response = await fetch(`http://localhost:8000/project-workflows/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        })

        if (!response.ok) {
          throw new Error("Falha ao buscar workflow de projeto")
        }

        const data = await response.json()
        setProjectWorkflow(data)
        setStages(data.stages)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectWorkflow(projectWorkflowId)
  }, [])

  function handleOpenEditWorkflowDialog() {
    setIsEditWorkflowDialogOpen(true)
  }

  function handleCloseEditWorkflowDialog() {
    setIsEditWorkflowDialogOpen(false)
  }

  async function handleSubmitEditWorkflowForm(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const { name } = Object.fromEntries(formData.entries())
    
    let res = null
    let resData = null
    try {
      res = await fetch(`http://localhost:8000/project-workflows/${projectWorkflowId}/`, {
        method: 'PUT',
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

    if (!res.ok) {
      enqueueSnackbar('Houve algum erro durante a atualização da workflow', { variant: 'error' })
      return
    }

    setProjectWorkflow(prev => ({
      ...prev,
      ...resData
    }))
    handleCloseEditWorkflowDialog()
  }

  function handleOpenAddEditStageDialog(stage=null) {
    setIsAddEditStageDialogOpen(true)
    setTargetStage(stage)
  }

  function handleCloseAddEditStageDialog() {
    setIsAddEditStageDialogOpen(false)
    setTargetStage(null)
  }

  async function handleSubmitAddEditStageForm(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const { name } = Object.fromEntries(formData.entries())
    
    let res = null
    let resData = null
    try {
      const baseUrl =  `http://localhost:8000/project-workflows/${projectWorkflowId}/project-stages/`
      const url = baseUrl + (targetStage ? `${targetStage.id}/` : '')
      res = await fetch(url, {
        method: targetStage ? 'PUT' : 'POST',
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

    if (!res.ok) {
      const message = (targetStage ?
        'Houve algum erro durante a atualização da etapa':
        'Houve algum erro durante a criação de nova etapa'
      )

      enqueueSnackbar(message, { variant: 'error' })
      console.log(resData)
      return
    }

    if (targetStage) {
      setStages(prevStages => prevStages.map(stage => stage.id === targetStage.id ? resData : stage))
      enqueueSnackbar('Etapa atualizada com sucesso', { variant: 'success' })
    } else {
      setStages([...stages, resData])
      enqueueSnackbar('Etapa adicionada com sucesso', { variant: 'success' })
    }
    handleCloseAddEditStageDialog()
  }

  function handleOpenDeleteStageDialog(stage=null) {
    setIsDeleteStageDialogOpen(true)
    setTargetStage(stage)
  }

  function handleCloseDeleteStageDialog() {
    setIsDeleteStageDialogOpen(false)
    setTargetStage(null)
  }

  async function handleDeleteStage() {
    let res = null
    try {
      res = await fetch(`http://localhost:8000/project-workflows/${projectWorkflowId}/project-stages/${targetStage.id}/`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
      return
    }

    if (!res.ok) {
      enqueueSnackbar('Houve algum erro durante a remoção da etapa', { variant: 'error' })
    }

    enqueueSnackbar('Etapa removida com sucesso', { variant: 'success' })
    setStages(prevStages => prevStages.filter(stage => stage.id !== targetStage.id))
    handleCloseDeleteStageDialog()
  }

  return (
    <>
      <Toolbar className="!px-0" >
        <Typography className="!mr-2" variant="h4" component={'h1'}>{!loading ? projectWorkflow.name : 'Loading'}</Typography>
        <IconButton>
          <Edit onClick={handleOpenEditWorkflowDialog} />
        </IconButton>
        <IconButton>
          <Delete />
        </IconButton>
        <Box className='grow' />
        <Button className="!mr-2" variant="contained" startIcon={<Add />} onClick={() => handleOpenAddEditStageDialog()}>
          Etapa
        </Button>
      </Toolbar>
      {stages.map(stage => (
        <Box key={stage.id} className="w-full !mb-4">
          <Paper className="w-full">
            <Toolbar className="bg-gray-200 !px-4">
              <Typography className="!mr-2" component={'div'} variant="h6">{stage.name}</Typography>
              <Box className='grow' />
              <IconButton>
                <Edit onClick={() => handleOpenAddEditStageDialog(stage)}/>
              </IconButton>
              <IconButton onClick={() => handleOpenDeleteStageDialog(stage)}>
                <Delete />
              </IconButton>
            </Toolbar>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Nome
                    </TableCell>
                    <TableCell>
                      Descrição
                    </TableCell>
                    <TableCell>
                      Dono
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.filter(p => p.stage === stage.name).map(project => (
                    <TableRow
                      key={project.name}
                      hover
                      onClick={() => console.log('click')}
                    >
                      <TableCell>
                        {project.name}
                      </TableCell>
                      <TableCell>
                        {project.description}
                      </TableCell>
                      <TableCell>
                        {project.name}
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      ))}
      <Dialog 
        open={isAddEditStageDialogOpen} 
        onClose={handleCloseAddEditStageDialog} 
        disableRestoreFocus
      >
        <DialogTitle>{targetStage ? 'Editar etapa' : 'Adicionar etapa'}</DialogTitle>
        <DialogContent className="w-md" >
          <DialogContentText mb={2}>
            {
              targetStage ? 
              'Edite os dados da etapa' : 
              'Adicione uma nova etapa para seus projetos'
            }
          </DialogContentText>
          <Box component="form" onSubmit={handleSubmitAddEditStageForm} id="add-edit-stage-form">
            <TextField
              id="name"
              name="name"
              label="Nome"
              placeholder="Digite o nome da etapa"
              type="text"
              required
              autoFocus
              fullWidth
              defaultValue={targetStage?.name || ""}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseAddEditStageDialog}>Cancelar</Button>
          <Button variant="contained" type="submit" form="add-edit-stage-form">
            {targetStage ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog 
        open={isEditWorkflowDialogOpen} 
        onClose={handleCloseEditWorkflowDialog} 
        disableRestoreFocus
      >
        <DialogTitle>Editar Workflow</DialogTitle>
        <DialogContent className="w-md" >
          <DialogContentText mb={2}>Edite os dados do workflow</DialogContentText>
          <Box component="form" onSubmit={handleSubmitEditWorkflowForm} id="edit-workflow-form">
            <TextField
              id="name"
              name="name"
              label="Nome"
              placeholder="Digite o nome do workflow"
              type="text"
              required
              autoFocus
              fullWidth
              defaultValue={projectWorkflow?.name}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseEditWorkflowDialog}>Cancelar</Button>
          <Button variant="contained" type="submit" form="edit-workflow-form">Salvar</Button>
        </DialogActions>
      </Dialog>
      <Dialog 
        open={isDeleteStageDialogOpen} 
        onClose={handleCloseDeleteStageDialog} 
        disableRestoreFocus
        maxWidth='sm'
        fullWidth={true}
      >
        <DialogTitle>Você tem certeza que deseja excluir etapa "{targetStage?.name}"?</DialogTitle>
        <DialogContent >
          <DialogContentText mb={2}>Esta ação é irreversível e pode levar a perda de dados.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDeleteStageDialog}>Cancelar</Button>
          <Button variant="contained" onClick={handleDeleteStage}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </> 
  )
}