import type { NextPage } from "next";
import Head from "next/head";

import { AlbumButton, SideMenu } from "~/components";

const AlbumSelection: NextPage = () => {
  return (
    <>
      <Head>
        <title>Select an Album</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex bg-dark-base">
        <SideMenu />
        <div className="grid w-full place-content-center">
          <div className="group grid grid-cols-3 items-center justify-center gap-10 py-10">
            <AlbumButton title="Pablo Honey" />
            <AlbumButton title="The Bends" />
            <AlbumButton title="OK Computer" />
            <AlbumButton title="Kid A" />
            <AlbumButton title="Amnesiac" />
            <AlbumButton title="Hail to the Thief" />
            <AlbumButton title="In Rainbows" />
            <AlbumButton title="The King of Limbs" />
            <AlbumButton title="A Moon Shaped Pool" />
          </div>
        </div>
      </main>
    </>
  );
};

export default AlbumSelection;
