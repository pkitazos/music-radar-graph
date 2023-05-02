import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

import { PageButton, SideMenu } from "~/components";
import { defaultChart } from "~/data";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [selected, setSelected] = useState(0);

  const [chartData, setChartData] = useState<chartData[]>([
    { ...defaultChart },
  ]);
  let { data, status, error, isSuccess } =
    api.accountRouter.getSpotifyAccount.useQuery();

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
              rate Radiohead's discography on 5 important metrics
            </PageButton>
            <PageButton title="the rest of the website" href="/404" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
