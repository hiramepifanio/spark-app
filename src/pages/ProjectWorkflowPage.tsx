import { useParams } from "react-router-dom";
import { useDialogState } from "../hooks/useDialogState";
import StageManager from "../components/StageManager";
import WorkflowPageHeader from "../components/WorkflowPageHeader";
import { Stage } from "../models/stage";

export default function ProjectWorkflowPage() {
  const { workflowId } = useParams()
  const workflowIdAsNumber = Number(workflowId)
  const addEditStageDialogState = useDialogState<Stage>()

  return (
    <>
      <WorkflowPageHeader 
        handleOpenAddStageDialog={addEditStageDialogState.open}
        workflowId={workflowIdAsNumber}
      />
      <StageManager 
        addEditStageDialogState={addEditStageDialogState}
        workflowId={workflowIdAsNumber}
      />
    </> 
  )
}