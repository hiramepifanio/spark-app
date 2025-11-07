import PartnersManager from "../components/PartnersManager";
import PartnersPageHeader from "../components/PartnersPageHeader";
import { useDialogState } from "../hooks/useDialogState";
import { PartnerOrganization } from "../models/partnerOrganization";


export default function PartnersPage() {
  const addPartnerDialogState = useDialogState<PartnerOrganization>()

  return (
    <>
      <PartnersPageHeader handleOpenAddPartnerDialog={addPartnerDialogState.open} />
      <PartnersManager addPartnerDialogState={addPartnerDialogState} />
    </>
  )
}