import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import StageTable from "./StageTable";
import { useDialogState } from "../hooks/useDialogState";
import DeleteDialog from "./DeleteDialog";
import { useAPI } from "../hooks/useAPI";
import { useSnackbar } from "notistack";
import { useFetch } from "../hooks/useFetch";
import AddEditStageDialog from "./AddEditStageDialog";

export default function StageManager({ addEditStageDialogState, workflowId }) {
  const { enqueueSnackbar } = useSnackbar();
  const deleteStageDialogState = useDialogState()
  const { post, put, del } = useAPI()

  const {isLoading, fetchedData: stages, setFetchedData: setStages} = (
    useFetch(`/project-workflows/${workflowId}/project-stages/`, [])
  )

  async function handleSubmitAddEditStageForm(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const payload = Object.fromEntries(formData.entries())

    const { isOk, data } = (addEditStageDialogState.subject ? 
      await put(`/project-workflows/${workflowId}/project-stages/${addEditStageDialogState.subject.id}/`, payload) :
      await post(`/project-workflows/${workflowId}/project-stages/`, payload)
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
      setStages(prevStages => prevStages.map(stage => stage.id === addEditStageDialogState.subject.id ? data : stage))
      enqueueSnackbar('Etapa atualizada com sucesso', { variant: 'success' })
    } else {
      setStages(prevStages => [...prevStages, data])
      enqueueSnackbar('Etapa adicionada com sucesso', { variant: 'success' })
    }
    addEditStageDialogState.close()
  }

  async function handleDeleteStage() {
    const { isOk } = await del(`/project-workflows/${workflowId}/project-stages/${deleteStageDialogState.subject.id}/`)

    if (!isOk) {
      enqueueSnackbar('Houve algum erro durante a remoção da etapa', { variant: 'error' })
      deleteStageDialogState.close()
      return
    }

    enqueueSnackbar('Etapa removida com sucesso', { variant: 'success' })
    setStages(prevStages => (
      prevStages.filter(stage => stage.id !== deleteStageDialogState.subject.id)
    ))
    deleteStageDialogState.close()
  }

  return (
    <>
      {(!isLoading && stages.length === 0) && (
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
      {!isLoading && stages.map(stage => (
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
      <DeleteDialog 
        isOpen={deleteStageDialogState.isOpen}
        description={`etapa "${deleteStageDialogState.subject?.name}"`}
        confirmHandler={handleDeleteStage}
        cancelHandler={deleteStageDialogState.close}
      />
    </>
  )
}