import { Avatar, Button, Card, CardActionArea, CardContent, CardHeader, Chip, Grid, IconButton, Stack, Tab, Tabs, Toolbar } from "@mui/material"
import { PartnerOrganization } from "../models/partnerOrganization"
import { DialogState } from "../hooks/useDialogState"
import AddEditPartnerDialog from "./AddEditPartnerDialog"
import { FormEvent, useEffect, useState } from "react"
import usePartnersActions, { AddPartnerOrganizationDTO } from "../hooks/usePartnersActions"
import { Add, FilterList, Search } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

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
  const { partners, isLoading, listPartners, addPartner } = usePartnersActions()
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate()

  useEffect(() => {
    listPartners()
  }, [])

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

  function handleClickPartnerCard(partnerId: number) {
    navigate(`/partners/${partnerId}`)
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
              <CardActionArea onClick={() => handleClickPartnerCard(partner.id)}>
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