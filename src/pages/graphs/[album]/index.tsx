import { GetStaticPaths, GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { InfoIcon, MusicIcon, SaveIcon } from "~/SVGs";
import { RadarChart, SideMenu } from "~/components";
import { defaultChart } from "~/data";
import { ModalProvider } from "~/hooks";
import { slugify } from "~/utils";
import { pageInfo } from "~/pages/data";
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

  let {
    data: albumChartData,
    status,
    error,
  } = api.templateRouter.getTemplateAverage.useQuery(templateID);

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
              <div className="hover:bg-slate-800/50">
                <InfoIcon />
              </div>
            </li>
            <li>
              <div className=" hover:bg-slate-800/50">
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
            <div className="flex flex-col gap-10 md:w-full md:flex-col md:place-items-center lg:w-1/3 lg:min-w-fit">
              <Image
                width={260}
                height={260}
                src={`/assets${slugify(title)}.png`}
                alt={`${title} album cover`}
              />
              <div className="btn items-center gap-3">
                {title}
                <MusicIcon />
              </div>
              <Link
                href={`/graphs${slugify(title)}/my-rating`}
                className="btn-primary btn"
              >
                rate it
              </Link>
            </div>
          </div>
        </ModalProvider>
      </main>
    </>
  );
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
