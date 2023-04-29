import Link from "next/link";
import {
  GraphIcon,
  SaveIcon,
  HomeIcon,
  InfoIcon,
  PlusIcon,
  RadarIcon,
} from "~/components/SVGs";
import { defaultChart } from "~/data";

interface props {
  selected: number;
  savedCharts: chartData[];
  setSavedCharts: React.Dispatch<React.SetStateAction<chartData[]>>;
  setSelectedChart: React.Dispatch<React.SetStateAction<number>>;
}

const SideMenu = ({
  selected,
  savedCharts,
  setSavedCharts,
  setSelectedChart,
}: props) => {
  const colorFill = (i: number) => {
    if (!savedCharts[i]?.albumName) return "text-warning";
    if (selected === i) return "text-lime-500";
    return "";
  };
  return (
    <div className="left-0 top-0 h-screen">
      <ul className="menu rounded-box w-max gap-1 p-2">
        <li className="tooltip tooltip-right" data-tip="Home Page">
          <Link href="/" className="hover:bg-slate-800/50">
            <HomeIcon />
          </Link>
        </li>
        <li className="tooltip tooltip-right" data-tip="Graph Page">
          <Link href="/global-graphs" className="hover:bg-slate-800/50">
            <RadarIcon />
          </Link>
        </li>
        <div className="divider" />

        <li>
          <div className="hover:bg-slate-800/50">
            <InfoIcon />
          </div>
        </li>
        <li>
          <div className="hover:bg-slate-800/50">
            <SaveIcon />
          </div>
        </li>
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
        </li>
        <div className="divider" />
        {savedCharts &&
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
          ))}
      </ul>
    </div>
  );
};

export default SideMenu;
