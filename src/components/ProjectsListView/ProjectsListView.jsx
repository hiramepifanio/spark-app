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
    "stage": "Ideation",
    "description": "Early exploration of sensor technology for precision agriculture."
  },
  {
    "name": "AI-LegalAssist",
    "startedAt": "02-2024",
    "finishedAt": null,
    "funding": 50000,
    "stage": "Ideation",
    "description": "Brainstorming AI-driven legal research and case support tool."
  },
  {
    "name": "GreenBattery Research",
    "startedAt": "11-2023",
    "finishedAt": null,
    "funding": 120000,
    "stage": "Pre-Avaliation",
    "description": "Investigating eco-friendly battery materials for renewable storage."
  },
  {
    "name": "WaterNet Monitoring",
    "startedAt": "06-2024",
    "finishedAt": null,
    "funding": 40000,
    "stage": "Pre-Avaliation",
    "description": "Testing low-cost IoT sensors for real-time water quality monitoring."
  },
  {
    "name": "SmartBridge Safety",
    "startedAt": "04-2023",
    "finishedAt": "09-2023",
    "funding": 75000,
    "stage": "Avaliation",
    "description": "Pilot system for monitoring bridge vibrations and structural safety."
  },
  {
    "name": "BioMed Tracker",
    "startedAt": "08-2024",
    "finishedAt": null,
    "funding": 95000,
    "stage": "Avaliation",
    "description": "Prototype wearable device for tracking vital biomedical signals."
  },
  {
    "name": "SolarMicrogrid",
    "startedAt": "01-2024",
    "finishedAt": null,
    "funding": 200000,
    "stage": "Planning",
    "description": "Designing decentralized solar grids for rural communities."
  },
  {
    "name": "AgroDrone System",
    "startedAt": "03-2024",
    "finishedAt": null,
    "funding": 150000,
    "stage": "Planning",
    "description": "Planning drones for automated crop health analysis and spraying."
  },
  {
    "name": "Urban Mobility Platform",
    "startedAt": "10-2022",
    "finishedAt": "05-2023",
    "funding": 300000,
    "stage": "Restructuring",
    "description": "Pivoting transport-sharing platform after initial user feedback."
  },
  {
    "name": "EduVR",
    "startedAt": "07-2023",
    "finishedAt": null,
    "funding": 180000,
    "stage": "Restructuring",
    "description": "Redesigning VR-based learning environment for remote schools."
  },
  {
    "name": "HealthAI",
    "startedAt": "01-2023",
    "finishedAt": null,
    "funding": 220000,
    "stage": "Development",
    "description": "Developing an AI assistant for personalized health recommendations."
  },
  {
    "name": "SmartLogistics",
    "startedAt": "09-2022",
    "finishedAt": null,
    "funding": 280000,
    "stage": "Development",
    "description": "Logistics optimization platform with real-time routing intelligence."
  },
  {
    "name": "ClimateData Hub",
    "startedAt": "02-2024",
    "finishedAt": null,
    "funding": 50000,
    "stage": "Development",
    "description": "Building an open data hub for climate and environmental datasets."
  },
  {
    "name": "QuantumSim",
    "startedAt": "12-2023",
    "finishedAt": null,
    "funding": 150000,
    "stage": "Paused",
    "description": "Simulation software for quantum algorithms, paused due to funding."
  },
  {
    "name": "SmartRetail",
    "startedAt": "05-2022",
    "finishedAt": "11-2022",
    "funding": 100000,
    "stage": "Finished",
    "description": "Retail analytics tool providing insights on consumer behavior."
  },
  {
    "name": "MedImage AI",
    "startedAt": "08-2021",
    "finishedAt": "04-2023",
    "funding": 350000,
    "stage": "Finished",
    "description": "AI solution for medical image classification and diagnostics."
  },
  {
    "name": "GreenPackaging",
    "startedAt": "03-2020",
    "finishedAt": "10-2021",
    "funding": 70000,
    "stage": "Archived",
    "description": "Sustainable packaging materials research archived after trials."
  },
  {
    "name": "AutoFarm Robotics",
    "startedAt": "06-2019",
    "finishedAt": "12-2020",
    "funding": 250000,
    "stage": "Archived",
    "description": "Prototype robots for automated farming, discontinued after tests."
  }
]

const columns = [
  { accessorKey: "name", header: "Name", size: 2 },
  { accessorKey: "description", header: "Description", size: 3 },
  { accessorKey: "funding", header: "Funding (USD)", size: 1 },
  { accessorKey: "stage", header: "Stage", size: 1 },
  { accessorKey: "startedAt", header: "Started At", size: 1 },
  { accessorKey: "finishedAt", header: "Finished At", size: 1 },
]

export default function ProjectsListView() {
  return (
    <>
      {stages.map(stage => (
        <ListViewGroup key={stage} data={projects.filter(p => p.stage === stage)} columns={columns}>{stage}</ListViewGroup>
      ))}
    </>
  )
}