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
  
  const [isAddEditStageDialogOpen, setIsAddEditStageDialogOpen] = useState(false)
  const [editingStage, setEditingStage] = useState(null)

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

  function handleOpenAddEditStageDialog(stage=null) {
    setIsAddEditStageDialogOpen(true)
    setEditingStage(stage)
  }

  function handleCloseAddEditStageDialog() {
    setIsAddEditStageDialogOpen(false)
    setEditingStage(null)
  }

  async function handleSubmitAddEditStageForm(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const { name } = Object.fromEntries(formData.entries())
    
    let res = null
    let resData = null
    try {
      console.log('editingStage', editingStage)
      const baseUrl =  `http://localhost:8000/project-workflows/${projectWorkflowId}/project-stages/`
      const url = baseUrl + (editingStage ? `${editingStage.id}/` : '')
      res = await fetch(url, {
        method: editingStage ? 'PUT' : 'POST',
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
      const message = (editingStage ?
        'Houve algum erro durante a atualização da etapa':
        'Houve algum erro durante a criação de nova etapa'
      )

      enqueueSnackbar(message, { variant: 'error' })
      console.log(resData)
      return
    }

    if (editingStage) {
      setStages(prevStages => prevStages.map(stage => stage.id === editingStage.id ? resData : stage))
      enqueueSnackbar('Etapa atualizada com sucesso', { variant: 'success' })
    } else {
      setStages([...stages, resData])
      enqueueSnackbar('Etapa adicionada com sucesso', { variant: 'success' })
    }
    handleCloseAddEditStageDialog()
  }

  async function handleDeleteStage(stageId) {
    let res = null
    try {
      res = await fetch(`http://localhost:8000/project-workflows/${projectWorkflowId}/project-stages/${stageId}/`, {
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
    setStages(prevStages => prevStages.filter(stage => stage.id !== stageId))
  }

  return (
    <>
      <Toolbar className="!px-0" >
        <Typography className="!mr-2" variant="h4" component={'h1'}>{!loading ? projectWorkflow.name : 'Loading'}</Typography>
        <IconButton>
          <Edit />
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
              <IconButton onClick={() => handleDeleteStage(stage.id)}>
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
        <DialogTitle>{editingStage ? 'Editar etapa' : 'Adicionar etapa'}</DialogTitle>
        <DialogContent className="w-md" >
          <DialogContentText mb={2}>
            {
              editingStage ? 
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
              defaultValue={editingStage?.name || ""}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseAddEditStageDialog}>Cancelar</Button>
          <Button variant="contained" type="submit" form="add-edit-stage-form">
            {editingStage ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </> 
  )
}