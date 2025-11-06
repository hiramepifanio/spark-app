import { TextField } from "@mui/material";
import AddEditDialog, { AddEditObjectDialogProps } from "./AddEditDialog";
import { Workflow } from "../models/workflow";

export default function AddEditWorkflowDialog({ isOpen, mode, cancelHandler, submitHandler, editingData }: AddEditObjectDialogProps<Workflow>) {
  return (
    <AddEditDialog
      isOpen={isOpen} 
      mode={mode} 
      description={'workflow'} 
      cancelHandler={cancelHandler}
      submitHandler={submitHandler}
    >
      <TextField
        id="name"
        name="name"
        label="Nome"
        placeholder="Digite o nome do workflow"
        type="text"
        required
        autoFocus
        fullWidth
        defaultValue={editingData?.name}
      />
    </AddEditDialog>
  )
}