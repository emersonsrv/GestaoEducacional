"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroCursoForm() {
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const res = await fetch("/api/cadastro-curso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    });

    if (res.ok) {
      setSuccess(true);
      setNome("");
      setTimeout(() => router.push("/administrador"), 2000);
    } else {
      const data = await res.json();
      setError(data.error || "Erro ao cadastrar curso");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Cadastrar Curso</h2>

      {error && <p className="text-sm text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-sm text-green-500 text-center mb-4">Curso cadastrado com sucesso!</p>}

      <form onSubmit={handleCadastro} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium">Nome do Curso</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Digite o nome do curso"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
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
