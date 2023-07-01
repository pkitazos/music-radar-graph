import { type NextPage } from "next";
import Head from "next/head";

import { PageButton, SideMenu } from "~/components";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex bg-dark-base">
        <SideMenu />
        <div className="grid w-full place-content-center">
          <div className="group flex items-center justify-center gap-10">
            <PageButton title="Radiohead" href="/graphs">
              rate Radiohead&apos;s discography on 5 fundamental metrics
            </PageButton>
            <PageButton title="the rest of the website" href="/coming-soon" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
