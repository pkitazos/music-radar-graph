import Link from "next/link";
import { ReactNode } from "react";
import { DiscIcon, InfoIcon, MapIcon } from "~/SVGs";
import UserIcon from "~/SVGs/UserIcon";

interface props {
  children?: ReactNode[];
}

const SideMenu = ({ children }: props) => {
  return (
    <div className="left-0 top-0 h-screen">
      <ul className="menu rounded-box w-max gap-1 p-2">
        <li className="tooltip tooltip-right" data-tip="Info">
          <div className="text-yellow-500 hover:bg-slate-800/50">
            <InfoIcon />
          </div>
        </li>
        <li className="tooltip tooltip-right" data-tip="Sign In">
          <Link href="/sign-in" className="hover:bg-slate-800/50">
            <UserIcon />
          </Link>
        </li>
        <li className="tooltip tooltip-right" data-tip="Where am I going?">
          <Link href="/" className="hover:bg-slate-800/50">
            <MapIcon />
          </Link>
        </li>
        <li className="tooltip tooltip-right" data-tip="Album selection">
          <Link href="/graphs" className="hover:bg-slate-800/50">
            <DiscIcon />
          </Link>
        </li>
        <div className="divider" />

        {/* //* adds new chart -> move to graph creation part of app */}
        {/*
        <li className="tooltip tooltip-right" data-tip="create new Graph">
          <div
            className="hover:bg-slate-800/50"
            onClick={() => {
              setSavedCharts((e) => [...e, { ...defaultChart }]);
              setSelectedChart(savedCharts.length);
            }}
          >
            <PlusIcon />
          </div>
        </li> */}
        {/* //* Something about saved charts (will load using custom hook) */}
        {/* {savedCharts &&
          savedCharts.map((_, i) => (
            <li
              key={i}
              className="tooltip tooltip-right"
              data-tip={savedCharts[i]?.albumName || "new album"}
            >
              <button
                onClick={() => setSelectedChart(i)}
                className={`hover:bg-slate-800/50 ${colorFill(i)}`}
              >
                <GraphIcon />
              </button>
            </li>
          ))} */}
        {children?.length && (
          <>
            {children}
            <div className="divider" />
          </>
        )}
      </ul>
    </div>
  );
};

export default SideMenu;
