import { GetStaticPaths, GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Loading, RadarGraph, SideMenu, TemplateArea } from "~/components";
import { pageInfo } from "~/data";
import { api, slugify } from "~/utils";

interface props {
  title: string;
  templateID: string;
}

const AlbumPage: NextPage<props> = ({ title, templateID }) => {
  const { data: aggregateTemplateData, error } =
    api.templateRouter.getGraphTemplateAggregate.useQuery(templateID);

  const fixedHEXColor = "#1fdf64";

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex bg-dark-base">
        <SideMenu />
        <div className="grid w-full grid-cols-2">
          <div className="flex items-center justify-center 2xl:justify-end">
            <div className="flex w-1/2 flex-col gap-10">
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
          <div className="flex items-center justify-center 2xl:justify-start">
            {!aggregateTemplateData ? (
              <Loading />
            ) : (
              <div className="w-full max-w-4xl md:w-max md:pt-3 lg:h-max lg:w-3/5 lg:pt-0 xl:w-4/5">
                <RadarGraph
                  data={aggregateTemplateData.fieldValues}
                  labels={aggregateTemplateData.fieldNames}
                  maxRating={10}
                  HEXcolor={fixedHEXColor}
                />
              </div>
            )}
          </div>
        </div>
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
