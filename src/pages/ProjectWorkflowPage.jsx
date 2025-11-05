import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useFetch } from "../hooks/useFetch";
import { useAPI } from "../hooks/useAPI";
import DeleteDialog from "../components/DeleteDialog";
import AddEditStageDialog from "../components/AddEditStageDialog";
import AddEditWorkflowDialog from "../components/AddEditWorkflowDialog";
import StageTable from "../components/StageTable";
import { useDialogState } from "../hooks/useDialogState";

export default function ProjectWorkflowPage() {
  const { projectWorkflowId } = useParams();
  const { post, put, del } = useAPI()

  const addEditStageDialogState = useDialogState()
  const deleteStageDialogState = useDialogState()
  const editWorkflowDialogState = useDialogState()
  const deleteWorkflowDialogState = useDialogState()

  const { enqueueSnackbar } = useSnackbar();
  const { authState } = use(AuthContext)
  const navigate = useNavigate()
  const token = authState.access

  const {isLoading: isLoadingWorkflow, fetchedData: workflow, setFetchedData: setWorkflow} = useFetch(`/project-workflows/${projectWorkflowId}`, 'GET')

  async function handleSubmitEditWorkflowForm(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const payload = Object.fromEntries(formData.entries())

    const { isOk, data } = await put(`/project-workflows/${projectWorkflowId}/`, payload)

    if (!isOk) {
      enqueueSnackbar('Houve algum erro durante atualização de workflow', { variant: 'error' })
      editWorkflowDialogState.close()
      return
    }

    setWorkflow(prev => ({
      ...prev,
      ...data
    }))
    editWorkflowDialogState.close()
    enqueueSnackbar('Workflow atualizado com sucesso', { variant: 'success' })
  }

  async function handleDeleteWorkflow() {
    const { isOk } = await del(`/project-workflows/${projectWorkflowId}/`)

    if (!isOk) {
      enqueueSnackbar('Houve algum erro durante exclusão de workflow', { variant: 'error' })
      deleteWorkflowDialogState.close()
      return
    }

    enqueueSnackbar('Workflow excluído com sucesso', { variant: 'success' })
    deleteWorkflowDialogState.close()
    navigate('/project-workflows')
  }

  // ------------------------ Stage

  async function handleSubmitAddEditStageForm(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const payload = Object.fromEntries(formData.entries())

    const { isOk, data } = (addEditStageDialogState.subject ? 
      await put(`/project-workflows/${projectWorkflowId}/project-stages/${addEditStageDialogState.subject.id}/`, payload) :
      await post(`/project-workflows/${projectWorkflowId}/project-stages/`, payload)
    )

    if (!isOk) {
      const message = (addEditStageDialogState.subject ?
        'Houve algum erro durante a atualização da etapa':
        'Houve algum erro durante a criação de nova etapa'
      )
      enqueueSnackbar(message, { variant: 'error' })
      addEditStageDialogState.close()
      return
    }

    if (addEditStageDialogState.subject) {
      setWorkflow(prevWorkflow => ({
        ...prevWorkflow,
        stages: prevWorkflow.stages.map(stage => stage.id === addEditStageDialogState.subject.id ? data : stage)
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
    addEditStageDialogState.close()
  }

  async function handleDeleteStage() {
    const { isOk } = await del(`/project-workflows/${projectWorkflowId}/project-stages/${deleteStageDialogState.subject.id}/`)

    if (!isOk) {
      enqueueSnackbar('Houve algum erro durante a remoção da etapa', { variant: 'error' })
      deleteStageDialogState.close()
      return
    }

    enqueueSnackbar('Etapa removida com sucesso', { variant: 'success' })
    setWorkflow(prevWorkflow => ({
      ...prevWorkflow,
      stages: prevWorkflow.stages.filter(stage => stage.id !== deleteStageDialogState.subject.id)
    }))
    deleteStageDialogState.close()
  }

  return (
    <>
      <Toolbar className="!px-0" >
        <Typography className="!mr-2" variant="h4" component={'h1'}>{!isLoadingWorkflow ? workflow.name : 'Loading'}</Typography>
        <IconButton>
          <Edit onClick={editWorkflowDialogState.open} />
        </IconButton>
        <IconButton onClick={deleteWorkflowDialogState.open}>
          <Delete />
        </IconButton>
        <Box className='grow' />
        <Button className="!mr-2" variant="contained" startIcon={<Add />} onClick={() => addEditStageDialogState.open()}>
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
            onClick={() => addEditStageDialogState.open()}
          >
            Adicionar etapa
          </Button>
        </Box>
      )}
      {workflow?.stages.map(stage => (
        <StageTable 
          key={stage.id}
          stage={stage}
          handleOpenAddEditStageDialog={addEditStageDialogState.open}
          handleOpenDeleteStageDialog={deleteStageDialogState.open}
        />
      ))}
      <AddEditStageDialog
        isOpen={addEditStageDialogState.isOpen} 
        mode={addEditStageDialogState.subject ? 'edit' : 'add'} 
        cancelHandler={addEditStageDialogState.close}
        submitHandler={handleSubmitAddEditStageForm}
        editingData={addEditStageDialogState.subject}
      />
      <AddEditWorkflowDialog
        isOpen={editWorkflowDialogState.isOpen} 
        mode={'edit'} 
        cancelHandler={editWorkflowDialogState.close}
        submitHandler={handleSubmitEditWorkflowForm}
        editingData={workflow}
      />
      <DeleteDialog 
        isOpen={deleteStageDialogState.isOpen}
        description={`etapa "${deleteStageDialogState.subject?.name}"`}
        confirmHandler={handleDeleteStage}
        cancelHandler={deleteStageDialogState.close}
      />
      <DeleteDialog 
        isOpen={deleteWorkflowDialogState.isOpen}
        description={'este workflow'}
        confirmHandler={handleDeleteWorkflow}
        cancelHandler={deleteWorkflowDialogState.close}
      />
    </> 
  )
}