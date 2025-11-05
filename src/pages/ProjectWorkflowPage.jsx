import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useFetch } from "../hooks/useFetch";
import { useAPI } from "../hooks/useAPI";
import DeleteDialog from "../components/DeleteDialog";
import AddEditStageDialog from "../components/AddEditStageDialog";
import AddEditWorkflowDialog from "../components/AddEditWorkflowDialog";
import { useDialogState } from "../hooks/useDialogState";
import StageManager from "../components/StageManager";
import WorkflowPageHeader from "../components/WorkflowPageHeader";

export default function ProjectWorkflowPage() {
  const { workflowId } = useParams();
  const addEditStageDialogState = useDialogState()

  return (
    <>
      <WorkflowPageHeader 
        handleOpenAddStageDialog={addEditStageDialogState.open}
        workflowId={workflowId}
      />
      <StageManager 
        addEditStageDialogState={addEditStageDialogState}
        workflowId={workflowId}
      />
    </> 
  )
}