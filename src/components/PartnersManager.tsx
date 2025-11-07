import { Avatar, Card, CardActionArea, CardContent, CardHeader, Chip, Grid, Stack } from "@mui/material"
import { useFetch } from "../hooks/useFetch"
import { PartnerOrganization } from "../models/partnerOrganization"
import { DialogState } from "../hooks/useDialogState"
import AddEditPartnerDialog from "./AddEditPartnerDialog"
import { useAPI } from "../hooks/useAPI"
import { FormEvent } from "react"
import { useSnackbar } from "notistack"

const tags = [
  "IA",
  "Diagnóstico",
  "ML",
  // "Chatbot",
  // "Telemedicina",
  // "Automação",
  // "Robótica",
  // "IA",
  // "Diagnóstico",
  // "ML",
  // "Software"
]

interface PartnersManagerProps {
  addPartnerDialogState: DialogState<PartnerOrganization>
}

export default function PartnersManager({ addPartnerDialogState }: PartnersManagerProps) {
  const { post } = useAPI()
  const { enqueueSnackbar } = useSnackbar()
  const {isLoading, data: partners, setData: setPartners} = useFetch<PartnerOrganization[]>(`/partner-organizations/`)

  async function handleSubmitAddStageForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    
    const { isOk, data } = await post<PartnerOrganization>('/partner-organizations/', payload)

    if (!isOk || data == null) {
      enqueueSnackbar('Houve algum erro durante o cadastro do parceiro', { variant: 'error' })
      addPartnerDialogState.close()
      return
    }

    setPartners(prevPartners => prevPartners ? [...prevPartners, data] : [data])
    enqueueSnackbar('Parceiro cadastrado com sucesso', { variant: 'success' })
    addPartnerDialogState.close()
  }

  return(
    <>
      <Grid container spacing={2}>
        {!isLoading && partners!.map(partner => (
          <Grid key={partner.id} size={4}>
            <Card>
              <CardActionArea onClick={() => console.log('click' + partner.name)}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe">
                      {partner.name[0].toUpperCase()}
                    </Avatar>
                  }
                  title={partner.name}
                  // subheader={`${partner.projectCount} projetos`}
                  subheader={`3 projetos`}
                />
                <CardContent>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {/* {partner.tags.map(tag => ( */}
                    {tags.map(tag => (
                      <Chip key={tag} label={tag}/>
                    ))}
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AddEditPartnerDialog 
        isOpen={addPartnerDialogState.isOpen} 
        mode={'add'} 
        cancelHandler={addPartnerDialogState.close}
        submitHandler={handleSubmitAddStageForm}
        editingData={null}
      />
    </>
  )
}