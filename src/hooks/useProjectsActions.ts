import { useSnackbar } from "notistack"
import { ApiResponse, useAPI } from "./useAPI"
import { useEffect, useState } from "react"
import { Project } from "../models/project"

export interface AddProjectDTO {
  name: string
  description: string
  problemToSolve: string
  innovationType: string
  cost: string
  duration: string
}

export default function useProjectsActions() {
  const { get, post, put, del } = useAPI()
  const { enqueueSnackbar } = useSnackbar()
  const [projects, setProjects] = useState<Project[]>([])
  const [project, setProject] = useState<Project>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  // async function listProjects(): Promise<void> {
  //   setIsLoading(true)
  //   const { isOk, data, errors } = await get<Project[]>('/project-organizations/')

  //   if (!isOk) {
  //     const message = errors.detail ?? 'Houve algum erro ao buscar parceiros'
  //     enqueueSnackbar(message, { variant: 'error' })
  //     setIsLoading(false)
  //     return
  //   }

  //   setProjects(data)
  //   setIsLoading(false)
  // }
  
  async function listProjectsByPartner(partnerId: number): Promise<void> {
    setIsLoading(true)
    const { isOk, data, errors } = await get<Project[]>(`/projects/?partner=${partnerId}`)

    if (!isOk) {
      const message = errors.detail ?? 'Houve algum erro ao buscar parceiros'
      enqueueSnackbar(message, { variant: 'error' })
      setIsLoading(false)
      return
    }

    setProjects(data)
    setIsLoading(false)
  }
  
  async function retrieveProject(id: number): Promise<void> {
    setIsLoading(true)
    const { isOk, data, errors } = await get<Project>(`/project-organizations/${id}/`)

    if (!isOk) {
      const message = errors.detail ?? 'Houve algum erro ao buscar parceiro'
      enqueueSnackbar(message, { variant: 'error' })
      setIsLoading(false)
      return
    }

    setProject(data)
    setProjects(prevProjects => {
      const i = prevProjects.findIndex(project => project.id === id)
      if (i) {
        return prevProjects.map(project => project.id === id ? data : project)
      } else {
        return [...prevProjects, data]
      }
    })
    setIsLoading(false)
  }

  async function addProject(payload: AddProjectDTO): Promise<ApiResponse<Project>> {
    const response = await post<Project>('/projects/', payload)
    const { data, errors } = response

    if (errors) {
      const message = errors.detail ?? 'Houve algum erro ao cadastrar projeto'
      enqueueSnackbar(message, { variant: 'error' })
      return response
    } 

    setProjects(prevProjects => [...prevProjects, data])
    enqueueSnackbar('Projeto cadastrado com sucesso', { variant: 'success' })

    return response
  }

  return {
    projects,
    project,
    isLoading,
    listProjectsByPartner,
    addProject
  }
}