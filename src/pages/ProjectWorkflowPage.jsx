import { useParams } from "react-router-dom";
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