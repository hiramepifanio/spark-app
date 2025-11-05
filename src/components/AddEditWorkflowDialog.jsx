import { TextField } from "@mui/material";
import AddEditDialog from "./AddEditDialog";


export default function AddEditWorkflowDialog({ isOpen, mode, cancelHandler, submitHandler, editingData }) {
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