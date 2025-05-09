import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminLayout from "./AdminLayout";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  } else if (session.user.role !== "ADMINISTRADOR") { // Corrigido para corresponder ao retorno do NextAuth
    redirect("/");
  }

  return <AdminLayout />;
}
