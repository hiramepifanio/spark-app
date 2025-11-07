import { TextField } from "@mui/material";
import AddEditDialog, { AddEditObjectDialogProps } from "./AddEditDialog";
import { Stage } from "../models/stage";

export default function AddEditPartnerDialog({ isOpen, mode, cancelHandler, submitHandler, editingData }: AddEditObjectDialogProps<Stage>) {
  return (
    <AddEditDialog
      isOpen={isOpen} 
      mode={mode} 
      description={'parceiro'} 
      cancelHandler={cancelHandler}
      submitHandler={submitHandler}
    >
      <TextField
          id="name"
          name="name"
          label="Nome"
          placeholder="Digite o nome da instituição parceira"
          type="text"
          required
          autoFocus
          fullWidth
          defaultValue={editingData?.name || ""}
        />
    </AddEditDialog>
  )
}