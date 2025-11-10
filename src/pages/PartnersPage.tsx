import { Typography } from "@mui/material";
import PartnersManager from "../components/PartnersManager";
import { useDialogState } from "../hooks/useDialogState";
import { PartnerOrganization } from "../models/partnerOrganization";


export default function PartnersPage() {
  const addPartnerDialogState = useDialogState<PartnerOrganization>()

  return (
    <>
      <Typography className="!mr-2" variant="h4" component={'h1'}>Parceiros</Typography>
      <PartnersManager addPartnerDialogState={addPartnerDialogState} />
    </>
  )
}