import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardHeader, Chip, Grid, IconButton, Stack, Tab, Tabs, TextField, Toolbar, Typography } from "@mui/material"
import { useFetch } from "../hooks/useFetch"
import { PartnerOrganization } from "../models/partnerOrganization"
import { DialogState } from "../hooks/useDialogState"
import AddEditPartnerDialog from "./AddEditPartnerDialog"
import { useAPI } from "../hooks/useAPI"
import { FormEvent, useState } from "react"
import { useSnackbar } from "notistack"
import usePartnersActions, { AddPartnerOrganizationDTO } from "../hooks/usePartnersActions"
import { Add, FilterList, Search } from "@mui/icons-material"

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
  const [value, setValue] = useState<number>(0);

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
  
  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setValue(newValue)
  }

  return(
    <>
      <Toolbar disableGutters className="justify-between !mb-4" >
        <Tabs value={value} onChange={handleChange} aria-label="view mode tabs">
          <Tab label="Galeria" />
          <Tab label="Tabela" />
          <Tab label="Quadro" />
        </Tabs>
        <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit">
            <FilterList />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => addPartnerDialogState.open(null)}
          >
            Parceiro
          </Button>
        </Stack>
      </Toolbar>
      {value === 0 &&
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
      }
      
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