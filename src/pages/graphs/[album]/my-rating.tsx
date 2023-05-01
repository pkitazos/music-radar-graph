import { GetStaticPaths, GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { InfoIcon, MusicIcon, SaveIcon } from "~/SVGs";
import { RadarChart, RangeSlider, SideMenu } from "~/components";
import { defaultChart } from "~/data";
import { ModalProvider, useMediaQuery } from "~/hooks";
import { pageInfo } from "~/pages/data";

interface props {
  title: string;
  color: { H: number; S: number; L: number };
  templateID: string;
}

const AlbumRatingPage: NextPage<props> = ({ title, color, templateID }) => {
  const [selected, setSelected] = useState(0);

  const [chartData, setChartData] = useState<chartData[]>([
    { ...defaultChart },
  ]);

  const { overall, strum, depression, society, bleep, anxiety } =
    chartData[selected]!;

  const keys = [
    "overall",
    "strum",
    "depression",
    "society",
    "bleep",
    "anxiety",
  ];

  const isLarge = useMediaQuery("(min-width: 1024px)");

  const numerals = ["I", "II", "III", "IV", "VI", "VI"];
  const fullLabels = [
    "Overall",
    "Strum Strum",
    "Depression",
    "We Live in a Society",
    "Bleep Bloop",
    "Anxiety",
  ];
  const labels = !isLarge ? numerals : fullLabels;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex flex-row bg-dark-base">
        <ModalProvider>
          <SideMenu>
            <li>
              <div className="hover:bg-slate-800/50">
                <InfoIcon />
              </div>
            </li>
            <li
              className="tooltip tooltip-right"
              data-tip="Save when you're done"
            >
              <div className="text-secondary hover:bg-slate-800/50">
                <SaveIcon />
              </div>
            </li>
          </SideMenu>
          <div className="flex h-screen w-full flex-col justify-center gap-3 px-8 py-10 sm:gap-1 md:items-center md:gap-3 lg:flex-row-reverse lg:gap-5 xl:gap-14 xl:py-16">
            <div className="flex h-3/4 justify-center md:w-max md:pt-3 lg:h-max lg:w-1/2 lg:pt-0">
              <RadarChart
                values={[overall, strum, depression, society, bleep, anxiety]}
                color={color}
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="btn w-max items-center gap-3">
                {title}
                <MusicIcon />
              </div>
              <div className="w-max">
                {keys.map((key, i) => (
                  <RangeSlider
                    key={i}
                    textColor="text-white"
                    label={
                      <div>
                        {isLarge && numerals[i] + " - "} {fullLabels[i]}
                      </div>
                    }
                    sliderVal={
                      chartData[selected]![key as keyof chartData] as number
                    }
                    setOuter={(x) => {
                      let clone = [...chartData];
                      //@ts-ignore
                      clone[selected][key as keyof chartData] = x;
                      setChartData(clone);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </ModalProvider>
      </main>
    </>
  );
};

export default AlbumRatingPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: Object.keys(pageInfo).map((e) => {
      return { params: { album: e } };
    }),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = (ctx) => {
  let album = ctx.params!["album"] as keyof typeof pageInfo;
  let a = { props: pageInfo[album] };
  return a;
};