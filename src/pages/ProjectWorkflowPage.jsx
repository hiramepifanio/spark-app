import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useFetch } from "../hooks/useFetch";
import { useAPI } from "../hooks/useAPI";
import DeleteDialog from "../components/DeleteDialog";
import AddEditStageDialog from "../components/AddEditStageDialog";
import AddEditWorkflowDialog from "../components/AddEditWorkflowDialog";
import { useDialogState } from "../hooks/useDialogState";
import StageManager from "../components/StageManager";

export default function ProjectWorkflowPage() {
  const { projectWorkflowId } = useParams();
  const { post, put, del } = useAPI()

  const editWorkflowDialogState = useDialogState()
  const deleteWorkflowDialogState = useDialogState()
  const addEditStageDialogState = useDialogState()

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()

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
      <StageManager 
        isLoading={isLoadingWorkflow}
        addEditStageDialogState={addEditStageDialogState}
        workflowId={projectWorkflowId}
      />
      <AddEditWorkflowDialog
        isOpen={editWorkflowDialogState.isOpen} 
        mode={'edit'} 
        cancelHandler={editWorkflowDialogState.close}
        submitHandler={handleSubmitEditWorkflowForm}
        editingData={workflow}
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