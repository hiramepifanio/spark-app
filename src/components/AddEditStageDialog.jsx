import { TextField } from "@mui/material";
import AddEditDialog from "./AddEditDialog";


export default function AddEditStageDialog({ isOpen, mode, cancelHandler, submitHandler, editingData }) {
  return (
    <AddEditDialog
      isOpen={isOpen} 
      mode={mode} 
      description={'etapa'} 
      cancelHandler={cancelHandler}
      submitHandler={submitHandler}
    >
      <TextField
          id="name"
          name="name"
          label="Nome"
          placeholder="Digite o nome da etapa"
          type="text"
          required
          autoFocus
          fullWidth
          defaultValue={editingData?.name || ""}
        />
    </AddEditDialog>
  )
}