import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { GraphMaker, SideMenu } from "~/components";
import { InfoIcon, SaveIcon } from "~/SVGs";
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
        <title>A Moon Shaped Pool</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex bg-dark-base">
        <ModalProvider>
          <SideMenu>
            <li>
              <div className="hover:bg-slate-800/50">
                <InfoIcon />
              </div>
            </li>
            <li>
              <div className="hover:bg-slate-800/50">
                <SaveIcon />
              </div>
            </li>
          </SideMenu>

          <GraphMaker
            chartData={chartData}
            setChartData={setChartData}
            selectedChart={selected}
            color={{ H: 0, S: 0, L: 100 }}
            textColor="text-white"
          />
        </ModalProvider>
      </main>
    </>
  );
};

export default Home;
