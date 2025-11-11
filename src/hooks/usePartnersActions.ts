import { useSnackbar } from "notistack"
import { ApiResponse, useAPI } from "./useAPI"
import { PartnerOrganization } from "../models/partnerOrganization"
import { useEffect, useState } from "react"

export interface AddPartnerOrganizationDTO {
  name: string
}

export default function usePartnersActions() {
  const { get, post, put, del } = useAPI()
  const { enqueueSnackbar } = useSnackbar()
  const [partners, setPartners] = useState<PartnerOrganization[]>([])
  const [partner, setPartner] = useState<PartnerOrganization>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
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
  
  async function retrievePartner(id: number): Promise<void> {
    setIsLoading(true)
    const { isOk, data, errors } = await get<PartnerOrganization>(`/partner-organizations/${id}/`)

    if (!isOk) {
      const message = errors.detail ?? 'Houve algum erro ao buscar parceiro'
      enqueueSnackbar(message, { variant: 'error' })
      setIsLoading(false)
      return
    }

    setPartner(data)
    setPartners(prevPartners => {
      const i = prevPartners.findIndex(partner => partner.id === id)
      if (i) {
        return prevPartners.map(partner => partner.id === id ? data : partner)
      } else {
        return [...prevPartners, data]
      }
    })
    setIsLoading(false)
  }

  async function addPartner(payload: AddPartnerOrganizationDTO): Promise<ApiResponse<PartnerOrganization>> {
    const response = await post<PartnerOrganization>('/partner-organizations/', payload)
    const { data, errors } = response

    if (errors) {
      const message = errors.detail ?? 'Houve algum erro durante o cadastro do parceiro'
      enqueueSnackbar(message, { variant: 'error' })
      return response
    } 

    setPartners(prevPartners => [...prevPartners, data])
    enqueueSnackbar('Parceiro cadastrado com sucesso', { variant: 'success' })

    return response
  }

  return {
    partners,
    partner,
    isLoading,
    listPartners,
    retrievePartner,
    addPartner
  }
}