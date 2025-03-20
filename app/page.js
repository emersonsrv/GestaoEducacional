import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  switch (session.user.role) {
    case "ACADEMICO":
      redirect("/academico");
    case "PROFESSOR":
      redirect("/professor");
    default:
      redirect("/administrador");
  }
}
