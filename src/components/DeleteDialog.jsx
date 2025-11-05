import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function DeleteDialog({ isOpen, description, cancelHandler, confirmHandler }) {
  return (
    <Dialog 
        open={isOpen} 
        onClose={cancelHandler} 
        disableRestoreFocus
        maxWidth='sm'
        fullWidth={true}
      >
        <DialogTitle>Você tem certeza que deseja excluir {description}?</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>Esta ação é irreversível e pode levar a perda de dados.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={cancelHandler}>Cancelar</Button>
          <Button variant="contained" onClick={confirmHandler}>Confirmar</Button>
        </DialogActions>
      </Dialog>
  )
}