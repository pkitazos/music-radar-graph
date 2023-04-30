import Link from "next/link";
import { ReactNode } from "react";
import { HomeIcon, InfoIcon } from "~/SVGs";
import PieChartIcon from "~/SVGs/PieChartIcon";

interface props {
  children?: ReactNode[];
}

const SideMenu = ({ children }: props) => {
  // const colorFill = (i: number) => {
  //   if (!savedCharts[i]?.albumName) return "text-warning";
  //   if (selected === i) return "text-lime-500";
  //   return "";
  // };
  return (
    <div className="left-0 top-0 h-screen">
      <ul className="menu rounded-box w-max gap-1 p-2">
        <li className="tooltip tooltip-right" data-tip="Info">
          <div className="text-yellow-500 hover:bg-slate-800/50">
            <InfoIcon />
          </div>
        </li>
        <li className="tooltip tooltip-right" data-tip="Home Page">
          <Link href="/" className="hover:bg-slate-800/50">
            <HomeIcon />
          </Link>
        </li>

        <li className="tooltip tooltip-right" data-tip="Graph Page">
          <Link href="/graphs" className="hover:bg-slate-800/50">
            <PieChartIcon />
          </Link>
        </li>
        <div className="divider -my-0.5" />

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
            <div className="divider -my-0.5" />
          </>
        )}
      </ul>
    </div>
  );
};

export default SideMenu;
