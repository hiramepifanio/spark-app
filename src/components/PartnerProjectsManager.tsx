import { Add, FilterList, Search } from "@mui/icons-material";
import { Button, Chip, IconButton, Paper, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Toolbar, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import useProjectsActions, { AddProjectDTO } from "../hooks/useProjectsActions";
import { useDialogState } from "../hooks/useDialogState";
import { Project } from "../models/project";
import AddEditProjectDialog from "./AddEditProjectDialog";

interface PartnerProjectsManagerProps {
  partnerId: number
}

export default function PartnerProjectsManager({ partnerId }: PartnerProjectsManagerProps) {
  const [tab, setTab] = useState<number>(0)
  const { projects, isLoading, listProjectsByPartner, addProject } = useProjectsActions()
  const addProjectDialogState = useDialogState<Project>()

  useEffect(() => {
    listProjectsByPartner(partnerId)
  }, [])

  function innovationTypeLabelToValue(label: string): string {
    switch (label) {
      case 'Produto':
        return 'product'
      case 'Serviço':
        return 'service'
      case 'Processo de Negócios':
        return 'business_process'
      case 'Modelo':
        return 'model'
      default:
        return 'product'
    }
  }

  async function handleSubmitAddProjectForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    const { innovationType, ...other } = Object.fromEntries(formData.entries())

    const payload = {
      ...other,
      innovationType: innovationTypeLabelToValue(innovationType as string),
      partner: partnerId
    }
    console.log(payload)

    const { isOk, data, errors } = await addProject(payload as unknown as AddProjectDTO)
    addProjectDialogState.close()
  }

  return (
    <>
      <Toolbar disableGutters className="justify-between !mb-1" >
        <Tabs value={tab} onChange={(e, newTab) => setTab(newTab)} aria-label="view mode tabs">
          {/* <Tab label="Galeria" /> */}
          <Tab label="Tabela" />
          {/* <Tab label="Quadro" /> */}
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
            onClick={() => addProjectDialogState.open(null)}
          >
            Projeto
          </Button>
        </Stack>
      </Toolbar>
      {(projects.length > 0) &&
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map(project => (
                  <TableRow
                    key={project.id}
                    hover
                    onClick={() => console.log('click')}
                  >
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>
                      <Chip label={project.isActive ? 'Ativo' : 'Desativado'} color={project.isActive ? 'success' : 'warning'} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
        <AddEditProjectDialog
          state={addProjectDialogState}
          submitHandler={handleSubmitAddProjectForm}
        />
    </>
  )
}