import { Avatar, AvatarGroup, Box, Button, Card, CardActionArea, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Add, Delete, Edit, MoreVert } from "@mui/icons-material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useFetch } from "../hooks/useFetch";
import { useAPI } from "../hooks/useAPI";

export default function ProjectWorkflowPage() {
  const { projectWorkflowId } = useParams();
  const { post, put, del } = useAPI()
  
  const [isDeleteStageDialogOpen, setIsDeleteStageDialogOpen] = useState(false)
  const [isAddEditStageDialogOpen, setIsAddEditStageDialogOpen] = useState(false)
  const [targetStage, setTargetStage] = useState(null)

  const [isDeleteWorkflowDialogOpen, setIsDeleteWorkflowDialogOpen] = useState(false)
  const [isEditWorkflowDialogOpen, setIsEditWorkflowDialogOpen] = useState(false)

  const { enqueueSnackbar } = useSnackbar();
  const { authState } = use(AuthContext)
  const navigate = useNavigate()
  const token = authState.access

  const {isLoading: isLoadingWorkflow, fetchedData: workflow, setFetchedData: setWorkflow} = useFetch(`/project-workflows/${projectWorkflowId}`, 'GET')

  function handleOpenEditWorkflowDialog() {
    setIsEditWorkflowDialogOpen(true)
  }

  function handleCloseEditWorkflowDialog() {
    setIsEditWorkflowDialogOpen(false)
  }

  async function handleSubmitEditWorkflowForm(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const payload = Object.fromEntries(formData.entries())

    const { isOk, data } = await put(`/project-workflows/${projectWorkflowId}/`, payload)

    if (!isOk) {
      enqueueSnackbar('Houve algum erro durante atualização de workflow', { variant: 'error' })
      handleCloseEditWorkflowDialog()
      return
    }

    setWorkflow(prev => ({
      ...prev,
      ...data
    }))
    handleCloseEditWorkflowDialog()
    enqueueSnackbar('Workflow atualizado com sucesso', { variant: 'success' })
  }

  function handleOpenDeleteWorkflowDialog() {
    setIsDeleteWorkflowDialogOpen(true)
  }

  function handleCloseDeleteWorkflowDialog() {
    setIsDeleteWorkflowDialogOpen(false)
  }

  async function handleDeleteWorkflow() {
    const { isOk } = await del(`/project-workflows/${projectWorkflowId}/`)

    if (!isOk) {
      enqueueSnackbar('Houve algum erro durante exclusão de workflow', { variant: 'error' })
      handleCloseDeleteWorkflowDialog()
      return
    }

    enqueueSnackbar('Workflow excluído com sucesso', { variant: 'success' })
    handleCloseDeleteWorkflowDialog()
    navigate('/project-workflows')
  }

  // ------------------------ Stage

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
    const payload = Object.fromEntries(formData.entries())

    const { isOk, data } = (targetStage ? 
      await put(`/project-workflows/${projectWorkflowId}/project-stages/${targetStage.id}/`, payload) :
      await post(`/project-workflows/${projectWorkflowId}/project-stages/`, payload)
    )

    if (!isOk) {
      const message = (targetStage ?
        'Houve algum erro durante a atualização da etapa':
        'Houve algum erro durante a criação de nova etapa'
      )
      enqueueSnackbar(message, { variant: 'error' })
      handleCloseAddEditStageDialog()
      return
    }

    if (targetStage) {
      setWorkflow(prevWorkflow => ({
        ...prevWorkflow,
        stages: prevWorkflow.stages.map(stage => stage.id === targetStage.id ? data : stage)
      }))
      enqueueSnackbar('Etapa atualizada com sucesso', { variant: 'success' })
    } else {
      data.projects = data.projects ? data.projects : []
      setWorkflow(prevWorkflow => ({
        ...prevWorkflow,
        stages: [
          ...prevWorkflow.stages,
          data
        ]
      }))
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
    const { isOk } = await del(`/project-workflows/${projectWorkflowId}/project-stages/${targetStage.id}/`)

    if (!isOk) {
      enqueueSnackbar('Houve algum erro durante a remoção da etapa', { variant: 'error' })
      handleCloseDeleteStageDialog()
      return
    }

    enqueueSnackbar('Etapa removida com sucesso', { variant: 'success' })
    setWorkflow(prevWorkflow => ({
      ...prevWorkflow,
      stages: prevWorkflow.stages.filter(stage => stage.id !== targetStage.id)
    }))
    handleCloseDeleteStageDialog()
  }

  return (
    <>
      <Toolbar className="!px-0" >
        <Typography className="!mr-2" variant="h4" component={'h1'}>{!isLoadingWorkflow ? workflow.name : 'Loading'}</Typography>
        <IconButton>
          <Edit onClick={handleOpenEditWorkflowDialog} />
        </IconButton>
        <IconButton onClick={handleOpenDeleteWorkflowDialog}>
          <Delete />
        </IconButton>
        <Box className='grow' />
        <Button className="!mr-2" variant="contained" startIcon={<Add />} onClick={() => handleOpenAddEditStageDialog()}>
          Adicionar Etapa
        </Button>
      </Toolbar>
      {!isLoadingWorkflow && workflow?.stages.length === 0 && (
        <Box
          className="flex flex-col items-center justify-center !py-20 text-center !border-2 border-dashed !border-gray-300 rounded-2xl"
        >
          <Typography variant="h6" gutterBottom color="text.secondary">
            Nenhuma etapa encontrada
          </Typography>
          <Typography variant="body2" color="text.secondary" className="max-w-sm !mb-4">
            Este workflow ainda não possui etapas. Crie a primeira etapa para começar a organizar seus projetos.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={() => handleOpenAddEditStageDialog()}
          >
            Adicionar etapa
          </Button>
        </Box>
      )}
      {workflow?.stages.map(stage => (
        <Box key={stage.id} className="w-full !mb-4">
          <Paper className="w-full">
            <Toolbar className="bg-gray-200 !px-4">
              <Typography className="!mr-2" component={'div'} variant="h6">{stage.name}</Typography>
              <Typography className="!mr-2" component={'div'} variant="body2">
                {`(${stage.projects.length})`}
              </Typography>
              <Box className='grow' />
              <IconButton>
                <Edit onClick={() => handleOpenAddEditStageDialog(stage)}/>
              </IconButton>
              <IconButton onClick={() => handleOpenDeleteStageDialog(stage)}>
                <Delete />
              </IconButton>
            </Toolbar>
            {stage.projects.length > 0 &&
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
                    {stage.projects.map(project => (
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
            }
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
              defaultValue={workflow?.name}
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
      <Dialog 
        open={isDeleteWorkflowDialogOpen} 
        onClose={handleCloseDeleteWorkflowDialog} 
        disableRestoreFocus
        maxWidth='sm'
        fullWidth={true}
      >
        <DialogTitle>Você tem certeza que deseja excluir este workflow?</DialogTitle>
        <DialogContent >
          <DialogContentText mb={2}>Esta ação é irreversível e pode levar a perda de dados.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDeleteWorkflowDialog}>Cancelar</Button>
          <Button variant="contained" onClick={handleDeleteWorkflow}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </> 
  )
}