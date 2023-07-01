import type { NextPage } from "next";
import Head from "next/head";
import { SideMenu } from "~/components";

const ComingSoon: NextPage = () => {
  return (
    <>
      <Head>
        <title>Coming Soon</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex bg-dark-base">
        <SideMenu />
        <div className="grid w-full place-content-center">
          <div className="flex flex-col items-center gap-10">
            <h1 className="text-4xl text-slate-300">Coming Soon..</h1>
            <h2 className="font-mono text-2xl text-slate-400">
              check back in <span className="text-primary">2-3</span> business
              years
            </h2>
          </div>
        </div>
      </main>
    </>
  );
};

export default ComingSoon;
