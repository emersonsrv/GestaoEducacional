import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { nome, username, password, role, cursoId } = await req.json();

    if (!nome || !username || !password || !role || !cursoId) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    // Verifica se o curso existe
    const curso = await prisma.curso.findUnique({ where: { id: Number(cursoId) } });
    if (!curso) {
      return NextResponse.json({ error: "Curso não encontrado." }, { status: 400 });
    }

    // Verifica se já existe uma credencial com esse nome de usuário
    const existingCredential = await prisma.credential.findUnique({ where: { username } });
    if (existingCredential) {
      return NextResponse.json({ error: "Nome de usuário já cadastrado!" }, { status: 400 });
    }

    // Criptografa a senha
    const hashedPassword = await hash(password, 10);

    // Cria a credencial sem o userId
    const credential = await prisma.credential.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // Cria o usuário associado à credencial
    const user = await prisma.user.create({
      data: {
        nome,
        role,
        credentialId: credential.id,
      },
    });

    // Atualiza a credencial com a referência ao userId
    await prisma.credential.update({
      where: { id: credential.id },
      data: { userId: user.id },
    });

    // Associa o usuário ao curso
    if (role === "PROFESSOR") {
      await prisma.professor.create({
        data: {
          userId: user.id,
          cursos: { connect: { id: Number(cursoId) } }, // Conecta ao curso
        },
      });
    } else if (role === "ACADEMICO") {
      await prisma.academico.create({
        data: {
          userId: user.id,
          cursoId: Number(cursoId), // Define o curso do acadêmico
        },
      });
    }

    return NextResponse.json({ message: "Usuário cadastrado com sucesso!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro no cadastro." }, { status: 500 });
  }
}
