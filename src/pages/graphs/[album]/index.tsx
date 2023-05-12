import { GetStaticPaths, GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { InfoIcon, SaveIcon } from "~/SVGs";
import { RadarGraph, SideMenu } from "~/components";
import { ModalProvider, useMediaQuery } from "~/hooks";
import { pageInfo } from "~/data";
import {
  generateNumerals,
  getFieldNames,
  getFieldValues,
  slugify,
} from "~/utils";

interface props {
  title: string;
  templateID: string;
}

const AlbumPage: NextPage<props> = ({ title, templateID }) => {
  const fieldNames = getFieldNames();
  const fieldValues = getFieldValues();
  const numerals = generateNumerals(fieldNames);

  const isLarge = useMediaQuery("(min-width: 1024px)");

  const labels = !isLarge ? numerals : fieldNames;

  const fixedHEXColor = "#1fdf64";

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex bg-dark-base">
        <ModalProvider>
          <SideMenu />
          <div className="flex h-screen w-full flex-col justify-center gap-3 px-8 py-10 sm:gap-1 md:items-center md:gap-3 lg:flex-row-reverse lg:gap-5 xl:gap-14 xl:py-16">
            <div className="w-full md:w-max md:pt-3 lg:h-max lg:w-2/5 lg:pt-0">
              <RadarGraph
                data={fieldValues}
                labels={labels}
                maxRating={10}
                HEXcolor={fixedHEXColor}
              />
            </div>
            <div className="grid place-items-center md:w-full lg:w-1/3 lg:min-w-fit">
              <div className="flex flex-col gap-10">
                <h1 className="font-mono text-4xl font-semibold">{title}</h1>
                <Image
                  width={300}
                  height={300}
                  src={`/assets${slugify(title)}.png`}
                  alt={`${title} album cover`}
                />
                <Link
                  href={`/graphs${slugify(title)}/my-rating`}
                  className={`btn-primary btn w-32 font-mono text-xl font-semibold text-pink-950`}
                >
                  rate it
                </Link>
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
