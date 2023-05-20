import { GetStaticPaths, GetStaticProps, type NextPage } from "next";
import Head from "next/head";

import { InstanceArea, Loading, SideMenu } from "~/components";
import { pageInfo } from "~/data";
import { api } from "~/utils";

interface props {
  title: string;
  templateID: string;
}

const AlbumRatingPage: NextPage<props> = ({ title, templateID }) => {
  const {
    data: aggregateTemplateData,
    isLoading,
    error,
  } = api.templateRouter.getGraphTemplateAggregate.useQuery(templateID);

  const fixedHEXColor = "#1fdf64";

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex flex-row bg-dark-base">
        <SideMenu />
        {!aggregateTemplateData ? (
          <Loading />
        ) : (
          <InstanceArea
            title={title}
            templateID={templateID}
            aggregateTemplateData={aggregateTemplateData}
            fixedHEXColor={fixedHEXColor}
          />
        )}
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
