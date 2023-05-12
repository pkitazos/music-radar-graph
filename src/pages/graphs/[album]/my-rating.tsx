import { GetStaticPaths, GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { InfoIcon, SaveIcon } from "~/SVGs";
import { RadarGraph, RangeSlider, SideMenu } from "~/components";
import { ModalProvider, useMediaQuery } from "~/hooks";
import { pageInfo } from "~/data";
import { generateNumerals, getFieldNames, getFieldValues } from "~/utils";

interface props {
  title: string;
  templateID: string;
}

const AlbumRatingPage: NextPage<props> = ({ title, templateID }) => {
  const fieldNames = getFieldNames();
  const fieldValues = getFieldValues();
  const numerals = generateNumerals(fieldNames);

  const isLarge = useMediaQuery("(min-width: 1024px)");

  const labels = !isLarge ? numerals : fieldNames;

  const [chartData, setChartData] = useState<number[]>([...fieldValues]);

  const fixedHEXColor = "#1fdf64";

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex flex-row bg-dark-base">
        <ModalProvider>
          <SideMenu />
          <div className="flex h-screen w-full flex-col justify-center gap-3 px-8 py-10 sm:gap-1 md:items-center md:gap-3 lg:flex-row-reverse lg:gap-5 xl:gap-14 xl:py-16">
            <div className="md:w-max md:pt-3 lg:w-2/5 lg:pt-0">
              <RadarGraph
                prevData={fieldValues}
                data={chartData}
                labels={labels}
                maxRating={10}
                HEXcolor={fixedHEXColor}
              />
            </div>
            <div className="flex flex-col items-start">
              <h1 className="mb-8 ml-12 font-mono text-4xl font-semibold">
                {title}
              </h1>

              <div className="w-max">
                {chartData.map((item, i) => (
                  <RangeSlider
                    key={i}
                    label={
                      <div>
                        {isLarge && `${numerals[i]} - `} {fieldNames[i]}
                      </div>
                    }
                    sliderVal={item}
                    setOuter={(x) => {
                      let clone = [...chartData];
                      clone[i] = x;
                      setChartData(clone);
                    }}
                  />
                ))}
              </div>
              <div className="mt-8 flex w-full justify-end gap-8">
                <button
                  className="btn w-32 font-mono text-xl font-semibold"
                  onClick={() => {
                    setChartData([...fieldValues]);
                  }}
                >
                  reset
                </button>
                <button className="btn-primary btn w-32 font-mono text-xl font-semibold text-pink-950">
                  save
                </button>
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
