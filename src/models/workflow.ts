import { Stage } from "./stage"

export interface Workflow {
  id: number
  organization: number
  name: string
  stages?: Stage[]
}