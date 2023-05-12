import { FC, KeyboardEventHandler, useEffect, useRef, useState } from "react";

import { CloseIcon, TickIcon } from "~/SVGs";
import { useModal } from "~/hooks";

interface props {
  setAlbum: (name: string) => void;
}

const AlbumModal: FC<props> = ({ setAlbum }) => {
  const [val, setVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);

  const close = useModal(<div />);

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") enterRef.current?.click();
    if (e.key === "Escape") close();
    if (e.key === "/" && e.ctrlKey) {
      close();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div className="backdrop-glass absolute top-0 z-10 flex h-screen w-full flex-col items-center justify-center gap-8">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type here"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-bordered input w-full max-w-xs"
        />
        <div className="flex gap-5">
          <button className="btn-circle btn" onClick={close}>
            <CloseIcon />
          </button>
          <button
            ref={enterRef}
            disabled={!val}
            className={`btn-primary btn-circle btn ${!val && "btn-disabled"}`}
            onClick={() => {
              setAlbum(val);
              close();
            }}
          >
            <TickIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default AlbumModal;
