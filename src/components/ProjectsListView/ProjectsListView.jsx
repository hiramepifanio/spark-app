import ListViewGroup from '../ListViewGroup/ListViewGroup'
import styles from './ProjectsListView.module.css'

const stages = [
  'Ideation', 
  'Pre-Avaliation', 
  'Avaliation', 
  'Planning', 
  'Restructuring', 
  'Development', 
  'Paused', 
  'Finished', 
  'Archived'
]



const projects = [
  {
    "name": "SmartCrop Sensors",
    "startedAt": "01-2025",
    "finishedAt": null,
    "funding": 25000,
    "stage": "Ideation"
  },
  {
    "name": "AI-LegalAssist",
    "startedAt": "02-2024",
    "finishedAt": null,
    "funding": 50000,
    "stage": "Ideation"
  },
  {
    "name": "GreenBattery Research",
    "startedAt": "11-2023",
    "finishedAt": null,
    "funding": 120000,
    "stage": "Pre-Avaliation"
  },
  {
    "name": "WaterNet Monitoring",
    "startedAt": "06-2024",
    "finishedAt": null,
    "funding": 40000,
    "stage": "Pre-Avaliation"
  },
  {
    "name": "SmartBridge Safety",
    "startedAt": "04-2023",
    "finishedAt": "09-2023",
    "funding": 75000,
    "stage": "Avaliation"
  },
  {
    "name": "BioMed Tracker",
    "startedAt": "08-2024",
    "finishedAt": null,
    "funding": 95000,
    "stage": "Avaliation"
  },
  {
    "name": "SolarMicrogrid",
    "startedAt": "01-2024",
    "finishedAt": null,
    "funding": 200000,
    "stage": "Planning"
  },
  {
    "name": "AgroDrone System",
    "startedAt": "03-2024",
    "finishedAt": null,
    "funding": 150000,
    "stage": "Planning"
  },
  {
    "name": "Urban Mobility Platform",
    "startedAt": "10-2022",
    "finishedAt": "05-2023",
    "funding": 300000,
    "stage": "Restructuring"
  },
  {
    "name": "EduVR",
    "startedAt": "07-2023",
    "finishedAt": null,
    "funding": 180000,
    "stage": "Restructuring"
  },
  {
    "name": "HealthAI",
    "startedAt": "01-2023",
    "finishedAt": null,
    "funding": 220000,
    "stage": "Development"
  },
  {
    "name": "SmartLogistics",
    "startedAt": "09-2022",
    "finishedAt": null,
    "funding": 280000,
    "stage": "Development"
  },
  {
    "name": "ClimateData Hub",
    "startedAt": "02-2024",
    "finishedAt": null,
    "funding": 50000,
    "stage": "Development"
  },
  {
    "name": "QuantumSim",
    "startedAt": "12-2023",
    "finishedAt": null,
    "funding": 150000,
    "stage": "Paused"
  },
  {
    "name": "SmartRetail",
    "startedAt": "05-2022",
    "finishedAt": "11-2022",
    "funding": 100000,
    "stage": "Finished"
  },
  {
    "name": "MedImage AI",
    "startedAt": "08-2021",
    "finishedAt": "04-2023",
    "funding": 350000,
    "stage": "Finished"
  },
  {
    "name": "GreenPackaging",
    "startedAt": "03-2020",
    "finishedAt": "10-2021",
    "funding": 70000,
    "stage": "Archived"
  },
  {
    "name": "AutoFarm Robotics",
    "startedAt": "06-2019",
    "finishedAt": "12-2020",
    "funding": 250000,
    "stage": "Archived"
  }
]

export default function ProjectsListView() {
  return (
    <>
      {stages.map(stage => (
        <ListViewGroup key={stage} rows={projects.filter(p => p.stage === stage)}>{stage}</ListViewGroup>
      ))}
    </>
  )
}