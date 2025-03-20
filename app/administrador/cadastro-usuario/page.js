import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CadastroUsuarioForm from "./CadastroUsuarioForm";

export default async function CadastroUsuarioPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Como Administrador não tem um modelo User, validamos de outra forma
  if (!session.user || session.user.role !== "ADMINISTRADOR") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CadastroUsuarioForm />
    </div>
  );
}
