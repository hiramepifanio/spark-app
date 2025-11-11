import { Typography } from "@mui/material";
import usePartnersActions from "../hooks/usePartnersActions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PartnerProjectsManager from "../components/PartnerProjectsManager";


export default function PartnerPage() {
  const { partnerId } = useParams()
  const partnerIdAsNumber = Number(partnerId)
  const {partner, isLoading, retrievePartner } = usePartnersActions()

  useEffect(() => {
    retrievePartner(partnerIdAsNumber)
  }, [partnerIdAsNumber])

  return (
    <>
      <Typography className="!mr-2" variant="h4" component={'h1'}>
        {isLoading ? 'Loading' : partner!.name}
      </Typography>
      <PartnerProjectsManager partnerId={partnerIdAsNumber} />
    </>
  )
}