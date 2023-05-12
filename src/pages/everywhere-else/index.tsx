import { type NextPage } from "next";
import Head from "next/head";
import { PageButton, SideMenu } from "~/components";

const EverywhereElse: NextPage = () => {
  return (
    <>
      <Head>
        <title>Where Next?</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex bg-dark-base">
        <SideMenu />
        <div className="grid w-full place-content-center">
          <div className="group grid grid-cols-2 items-center justify-center gap-10">
            <PageButton title="Make your own Graph" href="/branch-1" />
            <PageButton title="View other Popular Graphs" href="/branch-2" />
          </div>
        </div>
      </main>
    </>
  );
};

export default EverywhereElse;
