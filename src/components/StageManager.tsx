import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import StageTable from "./StageTable";
import { DialogState, useDialogState } from "../hooks/useDialogState";
import DeleteDialog from "./DeleteDialog";
import { useAPI } from "../hooks/useAPI";
import { useSnackbar } from "notistack";
import { useFetch } from "../hooks/useFetch";
import AddEditStageDialog from "./AddEditStageDialog";
import { Stage } from "../models/stage";
import { FormEvent } from "react";

interface StageManagerProps {
  workflowId: number
  addEditStageDialogState: DialogState<Stage>
}

export default function StageManager({ addEditStageDialogState, workflowId }: StageManagerProps) {
  const { enqueueSnackbar } = useSnackbar();
  const deleteStageDialogState = useDialogState<Stage>()
  const { post, put, del } = useAPI()

  const {isLoading, data: stages, setData: setStages} = (
    useFetch<Stage[]>(`/project-workflows/${workflowId}/project-stages/`, [])
  )

  async function handleSubmitAddEditStageForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    const { isOk, data } = (addEditStageDialogState.subject ? 
      await put<Stage>(`/project-workflows/${workflowId}/project-stages/${addEditStageDialogState.subject.id}/`, payload) :
      await post<Stage>(`/project-workflows/${workflowId}/project-stages/`, payload)
    )

    if (!isOk || data === null) {
      const message = (addEditStageDialogState.subject ?
        'Houve algum erro durante a atualização da etapa':
        'Houve algum erro durante a criação de nova etapa'
      )
      enqueueSnackbar(message, { variant: 'error' })
      addEditStageDialogState.close()
      return
    }

    if (addEditStageDialogState.subject) {
      const subject = addEditStageDialogState.subject
      setStages(prevStages => prevStages ? prevStages.map(stage => stage.id === subject.id ? data : stage) : null)
      enqueueSnackbar('Etapa atualizada com sucesso', { variant: 'success' })
    } else {
      setStages(prevStages => prevStages ? [...prevStages, data] : [data])
      enqueueSnackbar('Etapa adicionada com sucesso', { variant: 'success' })
    }
    addEditStageDialogState.close()
  }

  async function handleDeleteStage(id: number) {
    const { isOk } = await del(`/project-workflows/${workflowId}/project-stages/${id}/`)

    if (!isOk) {
      enqueueSnackbar('Houve algum erro durante a remoção da etapa', { variant: 'error' })
      deleteStageDialogState.close()
      return
    }

    enqueueSnackbar('Etapa removida com sucesso', { variant: 'success' })
    setStages(prevStages => prevStages ? prevStages.filter(stage => stage.id !== id) : null)
    deleteStageDialogState.close()
  }

  return (
    <>
      {(!isLoading && (!stages || stages.length === 0)) && (
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
      {!isLoading && stages && stages.map(stage => (
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
        confirmHandler={() => {
          if (deleteStageDialogState.subject) {
            handleDeleteStage(deleteStageDialogState.subject.id)
          }
        }}
        cancelHandler={deleteStageDialogState.close}
      />
    </>
  )
}