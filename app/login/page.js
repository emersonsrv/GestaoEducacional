import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "./LoginForm"; // Componente do formulário de login no client-side
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // Obtém a sessão no lado do servidor
  const session = await getServerSession(authOptions);

  // Se o usuário já estiver autenticado, redireciona para a página inicial
  if (session) {
    redirect("/");  // Redireciona se o usuário estiver logado
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <LoginForm />  {/* Componente do formulário de login */}
    </div>
  );
}
