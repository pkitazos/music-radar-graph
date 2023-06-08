import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { MusicIcon } from "~/SVGs";

import { AlbumModal, InputField, SideMenu } from "~/components";
import TemplateCreation from "~/components/templates/TemplateCreation";
import { ModalProvider, useModal } from "~/hooks";

const GraphCreation: NextPage = () => {
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fixedHEXColor = "#1fdf64";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && e.ctrlKey) {
        modalButtonRef.current?.click();
        console.log("print");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <>
      <Head>
        <title>Create</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <ModalProvider>
        <main className="flex flex-row bg-dark-base">
          <SideMenu />
          <div className="grid w-full grid-cols-2">
            <div className="flex items-center justify-center">
              <button
                ref={modalButtonRef}
                className="btn items-center gap-3"
                onClick={useModal(<AlbumModal setAlbum={() => {}} />)}
              >
                Choose an album
                <MusicIcon className="w-4" />
              </button>
            </div>
            <div className="flex items-center justify-center">
              <TemplateCreation />
            </div>
          </div>
        </main>
      </ModalProvider>
    </>
  );
};

export default GraphCreation;
