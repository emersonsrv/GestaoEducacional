"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminLayout() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Painel de Administrador</h1>

          <div className="flex items-center space-x-6">
            {/* Dropdown de Cadastro */}
            <div className="relative">
              <button
                className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded-md"
                onClick={() => toggleDropdown("cadastro")}
              >
                Cadastrar
              </button>
              {openDropdown === "cadastro" && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10">
                  <Link
                    href="/administrador/cadastro-usuario"
                    className="block px-4 py-2 hover:bg-green-100"
                  >
                    Usuário
                  </Link>
                  <Link
                    href="/administrador/cadastro-curso"
                    className="block px-4 py-2 hover:bg-green-100"
                  >
                    Curso
                  </Link>
                  <Link
                    href="/administrador/cadastro-disciplina"
                    className="block px-4 py-2 hover:bg-green-100"
                  >
                    Disciplina
                  </Link>
                </div>
              )}
            </div>

            {/* Dropdown de Edicao */}
            <div className="relative">
              <button
                className="bg-yellow-500 hover:bg-yellow-700 px-4 py-2 rounded-md"
                onClick={() => toggleDropdown("edicao")}
              >
                Editar
              </button>
              {openDropdown === "edicao" && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10">
                  <Link
                    href="/administrador/edicao-curso"
                    className="block px-4 py-2 hover:bg-yellow-100"
                  >
                    Curso
                  </Link>
                </div>
              )}
            </div>

            {/* Botão de Sair */}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-red-600 hover:bg-red-800 px-4 py-2 rounded-md text-white"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow p-6 flex justify-center items-center">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Bem-vindo ao Painel do Administrador!
          </h2>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-blue-600 text-white py-4 mt-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="text-sm">Versão 1.0.0</span>
          <span className="text-sm">&copy; 2025 - Emerson Versiani</span>
        </div>
      </footer>
    </div>
  );
}
