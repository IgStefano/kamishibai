import type { IncomingMessage, ServerResponse } from "http";
import type { InferGetServerSidePropsType } from "next";
import { signIn } from "next-auth/react";

import Button from "../../components/button";
import Layout from "../../components/layout";
import { getServerAuthSession } from "../../server/auth";

export default function Login({
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout message="Entre para ver e criar aventuras">
      <section className="flex flex-col gap-6">
        <h4 className="w-full text-center text-base font-medium text-gray-500"></h4>
        {error && (
          <p className="text-center text-sm font-bold text-burgundy-700">
            {error}
          </p>
        )}
        <Button
          onClick={() => void signIn("google")}
          label="Entrar com Google"
          icon="ph:google-logo-bold"
        />
        <Button
          onClick={() => void signIn("discord")}
          label="Entrar com Discord"
          icon="ph:discord-logo-bold"
        />
      </section>
    </Layout>
  );
}

export async function getServerSideProps(ctx: {
  resolvedUrl?: string;
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> };
  res: ServerResponse<IncomingMessage>;
}) {
  const session = await getServerAuthSession(ctx);
  let error = "";

  if (ctx.resolvedUrl?.includes("error"))
    error = "Tivemos um problema na sua entrada. Por favor, tente novamente.";

  if (ctx.resolvedUrl?.includes("error=OAuthAccountNotLinked"))
    error =
      "Por favor, entre com o serviço que usou pela primeira vez para acessar o Kamishibai.";

  if (session) {
    return {
      redirect: {
        destination: "/campaigns",
      },
    };
  }

  return {
    props: { session, error },
  };
}
