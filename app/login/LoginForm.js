"use client"; // Garantir que o código é executado no client-side

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Primeiro, tenta autenticar como Administrador
    let res = await signIn("administrador", {
      redirect: false,
      username, // Alterado de nome para username
      password,
    });

    if (res?.error) {
      // Se falhar, tenta autenticar como usuário comum
      res = await signIn("credentials", {
        redirect: false,
        username, // Alterado de nome para username
        password,
      });
    }

    if (res?.error) {
      setError("Credenciais inválidas");
    } else {
      router.push("/"); // Redireciona para a página inicial após login bem-sucedido
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

      {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}

      <form onSubmit={handleLogin} className="mt-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium">Nome de Usuário</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Digite seu nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium">Senha</label>
          <input
            type="password"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
