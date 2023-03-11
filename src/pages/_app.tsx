import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import Head from "next/head";
import { notoSans } from "../styles/fonts";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Kamishibai</title>
        <meta name="description" content="Aventure-se!" />
        <link rel="icon" href="https://api.iconify.design/twemoji/scroll.svg" />
      </Head>
      <main className="flex h-screen w-screen justify-center bg-gray-200">
        <div className=" h-full w-full max-w-lg bg-gray-50">
          <div
            className={`flex w-full max-w-4xl flex-col items-center justify-center gap-4 px-6 pt-8 ${notoSans.className} font-sans`}
          >
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
