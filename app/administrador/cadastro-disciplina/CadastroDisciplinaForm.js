"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CadastroDisciplinaForm() {
  const [nome, setNome] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [cursoId, setCursoId] = useState("");
  const [cursos, setCursos] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Buscar cursos do backend
    const fetchCursos = async () => {
      try {
        const res = await fetch("/api/cursos");
        const data = await res.json();
        setCursos(data || []);
      } catch (err) {
        console.error("Erro ao carregar cursos:", err);
      }
    };

    fetchCursos();
  }, []);

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const res = await fetch("/api/cadastro-disciplina", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, cargaHoraria: Number(cargaHoraria), cursoId }),
    });

    if (res.ok) {
      setSuccess(true);
      setNome("");
      setCargaHoraria("");
      setCursoId("");
      setTimeout(() => router.push("/administrador"), 2000);
    } else {
      const data = await res.json();
      setError(data.error || "Erro ao cadastrar disciplina");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Cadastrar Disciplina</h2>

      {error && <p className="text-sm text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-sm text-green-500 text-center mb-4">Disciplina cadastrada com sucesso!</p>}

      <form onSubmit={handleCadastro} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium">Nome</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Digite o nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium">Carga Horária</label>
          <input
            type="number"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Digite a carga horária"
            value={cargaHoraria}
            onChange={(e) => setCargaHoraria(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium">Curso</label>
          <select
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={cursoId}
            onChange={(e) => setCursoId(e.target.value)}
            disabled={cursos.length === 0}
            required
          >
            <option value="">Selecione um curso</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.nome}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
