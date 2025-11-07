import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDialogState } from "../hooks/useDialogState";
import { useAPI } from "../hooks/useAPI";
import AddEditWorkflowDialog from "./AddEditWorkflowDialog";
import DeleteDialog from "./DeleteDialog";
import { Stage } from "../models/stage";
import { FormEvent, useState } from "react";
import { Workflow } from "../models/workflow";

interface PartnersPageHeaderProps {
  handleOpenAddPartnerDialog: () => void
}

export default function PartnersPageHeader({ handleOpenAddPartnerDialog }: PartnersPageHeaderProps) {
  return (
    <>
      <Toolbar className="!px-0" >
        <Typography className="!mr-2" variant="h4" component={'h1'}>Parceiros</Typography>
        <Box className='grow' />
        <Button className="!mr-2" variant="contained" startIcon={<Add />} onClick={() => handleOpenAddPartnerDialog()}>
          Adicionar Parceiro
        </Button>
      </Toolbar>
    </>
  )
}