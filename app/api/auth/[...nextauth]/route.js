import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    // Provedor para Usuários Comuns (Professores e Acadêmicos)
    CredentialsProvider({
      name: "Usuário",
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const credential = await prisma.credential.findUnique({
          where: { username: credentials.username },
          include: { user: true }, // Puxa os dados do usuário associado
        });

        if (
          credential &&
          (await bcrypt.compare(credentials.password, credential.password))
        ) {
          return {
            id: credential.user.id,
            nome: credential.user.nome,
            role: credential.user.role,
          };
        }

        return null;
      },
    }),

    // Provedor separado para Administrador
    CredentialsProvider({
      name: "Administrador",
      id: "administrador",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const admin = await prisma.administrador.findUnique({
          where: { username: credentials.username },
        });

        if (admin && (await bcrypt.compare(credentials.password, admin.password))) {
          return {
            id: admin.id,
            nome: admin.username,
            role: "ADMINISTRADOR",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
