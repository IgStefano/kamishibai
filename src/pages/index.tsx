import type { IncomingMessage, ServerResponse } from "http";
import { type NextPage } from "next";
import Layout from "../components/layout";
import Spinner from "../components/ui/spinner";
import { getServerAuthSession } from "../server/auth";

const Home: NextPage = () => {
  return (
    <Layout className="flex flex-col items-center justify-center">
      <h2 className="text-center text-xl text-gray-600">
        Aguarde enquanto te redirecionamos! :)
      </h2>
      <div className="pt-4">
        <Spinner />
      </div>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(ctx: {
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> };
  res: ServerResponse<IncomingMessage>;
}) {
  const session = await getServerAuthSession(ctx);
  const destination = session ? "/campaigns" : "/login";

  return {
    redirect: {
      destination: destination,
    },
  };
}
