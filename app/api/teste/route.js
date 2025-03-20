import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cursoComDisciplinas = await prisma.curso.findUnique({ 
      where: { id: 1 },
      include: { disciplinas: true },
    });

    return NextResponse.json(cursoComDisciplinas);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar o curso." }, { status: 500 });
  }
}
