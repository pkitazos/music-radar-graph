import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { GraphMaker, SideMenu } from "~/components";
import { defaultChart } from "~/data";
import { ModalProvider } from "~/hooks/useModal";

const Home: NextPage = () => {
  const [selected, setSelected] = useState(0);

  const [chartData, setChartData] = useState<chartData[]>([
    { ...defaultChart },
  ]);

  return (
    <>
      <Head>
        <title>Ok Computer</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex bg-dark-base">
        <ModalProvider>
          <SideMenu
            selected={selected}
            savedCharts={chartData}
            setSavedCharts={setChartData}
            setSelectedChart={setSelected}
          />
          <GraphMaker
            chartData={chartData}
            setChartData={setChartData}
            selectedChart={selected}
            color={{ H: 45, S: 93, L: 47 }}
            textColor="text-yellow-500"
          />
        </ModalProvider>
      </main>
    </>
  );
};

export default Home;