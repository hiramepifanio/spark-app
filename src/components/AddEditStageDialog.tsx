import { TextField } from "@mui/material";
import AddEditDialog, { AddEditDialogMode, AddEditObjectDialogProps } from "./AddEditDialog";
import { FormEventHandler } from "react";
import { Stage } from "../models/stage";

export default function AddEditStageDialog({ isOpen, mode, cancelHandler, submitHandler, editingData }: AddEditObjectDialogProps<Stage>) {
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