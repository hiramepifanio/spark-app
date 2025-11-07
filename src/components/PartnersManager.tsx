import { Avatar, Card, CardActionArea, CardContent, CardHeader, Chip, Grid, Stack } from "@mui/material"
import { useFetch } from "../hooks/useFetch"
import { PartnerOrganization } from "../models/partnerOrganization"
import { DialogState } from "../hooks/useDialogState"
import AddEditPartnerDialog from "./AddEditPartnerDialog"
import { useAPI } from "../hooks/useAPI"
import { FormEvent } from "react"
import { useSnackbar } from "notistack"
import usePartnersActions, { AddPartnerOrganizationDTO } from "../hooks/usePartnersActions"

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
  const { partners, isLoading, addPartner } = usePartnersActions()

  async function handleSubmitAddStageForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    const payload: AddPartnerOrganizationDTO = {
      name: formData.get('name') as string,
    }
    
    const { errors } = await addPartner(payload)

    if (errors) {

    }

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