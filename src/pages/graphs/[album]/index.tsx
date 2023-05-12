import { GetStaticPaths, GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { InfoIcon, MusicIcon, SaveIcon } from "~/SVGs";
import { RadarChart, SideMenu } from "~/components";
import RadarGraph from "~/components/RadarGraph";
import { defaultChart } from "~/data";
import { ModalProvider } from "~/hooks";
import { pageInfo } from "~/pages/data";
import { slugify } from "~/utils";
import { api } from "~/utils/api";

interface props {
  title: string;
  color: { H: number; S: number; L: number };
  templateID: string;
}

const AlbumPage: NextPage<props> = ({ title, color, templateID }) => {
  const [selected, setSelected] = useState(0);

  const [chartData, setChartData] = useState<chartData[]>([
    { ...defaultChart },
  ]);

  // let {
  //   data: albumChartData,
  //   status,
  //   error,
  // } = api.templateRouter.getTemplateAverage.useQuery(templateID);

  const { overall, strum, depression, society, bleep, anxiety } =
    chartData[selected]!;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex bg-dark-base">
        <ModalProvider>
          <SideMenu>
            <li>
              <div className="hover:bg-zinc-900/50">
                <InfoIcon />
              </div>
            </li>
            <li>
              <div className=" hover:bg-zinc-900/50">
                <SaveIcon />
              </div>
            </li>
          </SideMenu>
          <div className="flex h-screen w-full flex-col justify-center gap-3 px-8 py-10 sm:gap-1 md:items-center md:gap-3 lg:flex-row-reverse lg:gap-5 xl:gap-14 xl:py-16">
            <div className="w-full md:w-max md:pt-3 lg:h-max lg:w-1/2 lg:pt-0">
              <RadarGraph
                data={[overall, strum, depression, society, bleep, anxiety]}
                labels={[
                  "Overall",
                  "Strum Strum",
                  "Depression",
                  "We Live in a Society",
                  "Bleep Bloop",
                  "Anxiety",
                ]}
                maxRating={10}
              />
            </div>
            <div className="grid place-items-center md:w-full lg:w-1/3 lg:min-w-fit">
              <div className="grid h-max w-96 grid-rows-[11] gap-y-10 text-center">
                <div className="row-span-1 grid grid-cols-7 gap-x-10">
                  <div className="col-span-5 ">
                    <h1 className="flex items-center gap-3 font-mono text-4xl font-semibold">
                      {title}
                      <MusicIcon className="w-5" />
                    </h1>
                  </div>
                </div>
                <div className="row-span-2 row-start-2 grid grid-cols-7 gap-x-10">
                  <div className="col-span-5">
                    <div className="h-32 w-32 rounded-lg rounded-br-[10rem] bg-zinc-900">
                      &nbsp;
                    </div>
                  </div>
                </div>
                <div className="row-span-5 row-start-4 grid h-max grid-cols-7 gap-x-10">
                  <Image
                    className="col-span-5 row-span-5 h-max w-full"
                    width={300}
                    height={300}
                    src={`/assets${slugify(title)}.png`}
                    alt={`${title} album cover`}
                  />

                  <div className="col-span-2 col-start-6 row-span-5 w-full">
                    <div className="h-32 w-32 rounded-lg rounded-bl-[10rem] bg-zinc-900">
                      &nbsp;
                    </div>
                  </div>
                </div>
                <div className="row-span-2 row-start-[9] grid grid-cols-7 gap-x-10">
                  <div className="col-span-5 flex justify-end ">
                    <div className="h-32 w-32 rounded-lg rounded-tl-[10rem] bg-zinc-900">
                      &nbsp;
                    </div>
                  </div>
                  <div className="col-span-2 col-start-6 flex items-end">
                    <div className="btn-disabled btn w-32 bg-zinc-900">
                      &nbsp;
                    </div>
                  </div>
                </div>
                <div className="row-span-1 row-start-[11] grid grid-cols-7 gap-x-10 ">
                  <div className="col-span-5 flex justify-end">
                    <Link
                      href={`/graphs${slugify(title)}/my-rating`}
                      className="btn-accent btn w-32"
                    >
                      rate it
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalProvider>
      </main>
    </>
  );
};

const Square = ({ className }: { className: string }) => {
  return <div className={`h-32 w-32 ${className} bg-zinc-900`}>&nbsp;</div>;
};

export default AlbumPage;

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
