import { use } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { AuthContext } from "../../contexts/AuthContext";

export default function DashboardPage() {
  const { authState } = use(AuthContext)

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <p>Olá, {authState.user.firstName}! Acompanhe os indicadores dos seus projetos aqui.</p>
    </>
  )
}