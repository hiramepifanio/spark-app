import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDialogState } from "../hooks/useDialogState";
import { useAPI } from "../hooks/useAPI";
import AddEditWorkflowDialog from "./AddEditWorkflowDialog";
import DeleteDialog from "./DeleteDialog";

export default function WorkflowPageHeader({ workflowId, handleOpenAddStageDialog }) {

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()
  const { put, del } = useAPI()
  
  const editWorkflowDialogState = useDialogState()
  const deleteWorkflowDialogState = useDialogState()

  const {isLoading: isLoadingWorkflow, fetchedData: workflow, setFetchedData: setWorkflow} = useFetch(`/project-workflows/${workflowId}/`, 'GET')

  async function handleSubmitEditWorkflowForm(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const payload = Object.fromEntries(formData.entries())

    const { isOk, data } = await put(`/project-workflows/${workflowId}/`, payload)

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
    const { isOk } = await del(`/project-workflows/${workflowId}/`)

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
        <Button className="!mr-2" variant="contained" startIcon={<Add />} onClick={() => handleOpenAddStageDialog()}>
          Adicionar Etapa
        </Button>
      </Toolbar>
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