import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { nome, cargaHoraria, cursoId } = await req.json();

    if (!nome || !cargaHoraria || !cursoId) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    // Verifica se o curso existe
    const curso = await prisma.curso.findUnique({ where: { id: Number(cursoId) } });
    if (!curso) {
      return NextResponse.json({ error: "Curso não encontrado." }, { status: 400 });
    }

    // Verifica se já existe uma disciplina com o mesmo nome no mesmo curso
    const existingDisciplina = await prisma.disciplina.findFirst({
      where: {
        nome,
        cursoId: Number(cursoId),
      },
    });

    if (existingDisciplina) {
      return NextResponse.json(
        { error: "Já existe uma disciplina com esse nome neste curso." },
        { status: 400 }
      );
    }

    // Cria a disciplina associada ao curso
    await prisma.disciplina.create({
      data: {
        nome,
        cargaHoraria: Number(cargaHoraria),
        cursoId: Number(cursoId),
      },
    });

    return NextResponse.json({ message: "Disciplina cadastrada com sucesso!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro no cadastro da disciplina." }, { status: 500 });
  }
}
