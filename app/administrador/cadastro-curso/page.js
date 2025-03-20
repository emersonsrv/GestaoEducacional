import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CadastroCursoForm from "./CadastroCursoForm";

export default async function CadastroCursoPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Apenas Administrador pode cadastrar cursos
  if (!session.user || session.user.role !== "ADMINISTRADOR") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CadastroCursoForm />
    </div>
  );
}
