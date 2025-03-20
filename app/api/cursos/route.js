import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cursos = await prisma.curso.findMany();
    return NextResponse.json(cursos, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar cursos." }, { status: 500 });
  }
}
