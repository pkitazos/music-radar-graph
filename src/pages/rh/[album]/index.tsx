/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import { SideMenu } from "~/components";
import { pageInfo } from "~/data";
import { api, slugify } from "~/utils";

interface props {
  title: string;
  templateID: string;
  albumID: string;
}

const AlbumPage: NextPage<props> = ({ title, templateID, albumID }) => {
  const { data: session } = useSession();
  const user = session?.user;

  const [selectedTrackIdx, setSelectedTrackIdx] = useState<number>(-1);

  const { data: tracks } = api.spotifyRouter.getTrackList.useQuery(albumID);
  // const tracks = ["track1", "track2", "track3"];

  const handleTrackSelection = (idx: number) => {
    if (idx === selectedTrackIdx) {
      setSelectedTrackIdx(-1);
      return;
    } else {
      setSelectedTrackIdx(idx);
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex h-screen bg-dark-base">
        <SideMenu />
        <div className="grid w-full grid-cols-12 grid-rows-6 gap-12 p-12">
          <section className="col-span-7 row-span-6 grid grid-rows-5 gap-8 rounded-lg bg-gray-900 p-8">
            <div className="row-span-1 row-start-1 flex flex-row items-center justify-between">
              <div className="flex h-full items-center gap-8">
                <div className="h-full">
                  <Image
                    width={100}
                    height={100}
                    src={`/assets${slugify(title)}.png`}
                    alt={`${title} album cover`}
                  />
                </div>
                <h1 className="font-mono text-3xl">{title}</h1>
              </div>
              {user && (
                <button className="btn-primary btn">start journey</button>
              )}
            </div>
            <div className="row-span-4 row-start-2 flex flex-col gap-3 overflow-y-scroll p-2">
              {tracks &&
                tracks.map((track, i) => (
                  <button
                    key={i}
                    className={`flex flex-row justify-between rounded-lg bg-slate-950 p-5 ${
                      i === selectedTrackIdx
                        ? "outline outline-2 outline-primary"
                        : "hover:outline hover:outline-2 hover:outline-primary/30"
                    }`}
                    onClick={() => handleTrackSelection(i)}
                  >
                    <p>{track}</p>
                    {user && (
                      <a className="btn-secondary btn-xs btn" href="">
                        rate track
                      </a>
                    )}
                  </button>
                ))}
            </div>
          </section>
          <section className="col-span-5 row-span-3 rounded-lg bg-gray-900">
            {tracks && tracks[selectedTrackIdx]}
          </section>
          <section className="col-span-5 row-span-3 rounded-lg bg-gray-900">
            &nbsp;
          </section>
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
  const album = ctx.params!["album"] as keyof typeof pageInfo;
  const a = { props: pageInfo[album] };
  return a;
};
