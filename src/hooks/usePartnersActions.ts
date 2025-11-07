import { useSnackbar } from "notistack"
import { useAPI } from "./useAPI"
import { PartnerOrganization } from "../models/partnerOrganization"
import { useEffect, useState } from "react"

export interface AddPartnerOrganizationDTO {
  name: string
}

export default function usePartnersActions() {
  const { get, post, put, del } = useAPI()
  const { enqueueSnackbar } = useSnackbar()
  const [partners, setPartners] = useState<PartnerOrganization[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    listPartners()
  }, [])
  
  async function listPartners(): Promise<void> {
    setIsLoading(true)
    const { isOk, data, errors } = await get<PartnerOrganization[]>('/partner-organizations/')

    if (!isOk) {
      const message = errors.detail ?? 'Houve algum erro ao buscar parceiros'
      enqueueSnackbar(message, { variant: 'error' })
      setIsLoading(false)
      return
    }

    setPartners(data)
    setIsLoading(false)
  }

  async function addPartner(payload: AddPartnerOrganizationDTO) {
    const { isOk, data } = await post<PartnerOrganization>('/partner-organizations/', payload)

    if (!isOk || data == null) {
      enqueueSnackbar('Houve algum erro durante o cadastro do parceiro', { variant: 'error' })
      return
    }

    setPartners(prevPartners => [...prevPartners, data])
    enqueueSnackbar('Parceiro cadastrado com sucesso', { variant: 'success' })
  }

  return { partners, isLoading, addPartner }
}