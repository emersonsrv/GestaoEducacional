import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { nome } = await req.json();

    if (!nome) {
      return NextResponse.json({ error: "O nome do curso é obrigatório." }, { status: 400 });
    }

    // Verifica se o curso já existe
    const existingCurso = await prisma.curso.findUnique({ where: { nome } });
    if (existingCurso) {
      return NextResponse.json({ error: "Curso já cadastrado." }, { status: 400 });
    }

    // Cria o curso
    await prisma.curso.create({
      data: { nome },
    });

    return NextResponse.json({ message: "Curso cadastrado com sucesso!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro no cadastro do curso." }, { status: 500 });
  }
}
