import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { FormEventHandler, ReactNode } from "react";

export type AddEditDialogMode = 'add' | 'edit'

export interface AddEditObjectDialogProps<T> {
  isOpen: boolean
  mode: AddEditDialogMode 
  cancelHandler: () => void 
  submitHandler: FormEventHandler<HTMLFormElement> 
  editingData: T | null
}

interface AddEditDialogProps {
  isOpen: boolean
  mode: AddEditDialogMode
  description: string
  cancelHandler: () => void 
  submitHandler: FormEventHandler<HTMLFormElement>
  children: ReactNode
}

export default function AddEditDialog({ isOpen, mode, description, cancelHandler, submitHandler, children }: AddEditDialogProps) {
  return (
    <Dialog 
      open={isOpen} 
      onClose={cancelHandler} 
      disableRestoreFocus
      maxWidth='sm'
      fullWidth={true}
    >
      <DialogTitle>{mode === 'edit' ? 'Editar' : 'Adicionar'} {description}</DialogTitle>
      <DialogContent>
        <Box mt={1} component="form" onSubmit={submitHandler} id="form">
          <Stack gap={2}>
            {children}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={cancelHandler}>Cancelar</Button>
        <Button variant="contained" type="submit" form="form">
          {mode === 'edit' ? 'Salvar' : 'Adicionar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}