/*
  Warnings:

  - A unique constraint covering the columns `[nome,cursoId]` on the table `Disciplina` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_nome_cursoId_key" ON "Disciplina"("nome", "cursoId");
