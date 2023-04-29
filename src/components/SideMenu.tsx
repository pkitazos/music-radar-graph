import {
  GraphIcon,
  SaveIcon,
  HomeIcon,
  InfoIcon,
  PlusIcon,
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
    <div className="absolute top-0">
      <ul className="menu rounded-box w-max gap-1 p-2">
        <li>
          <div className="hover:bg-slate-800/50">
            <HomeIcon />
          </div>
        </li>
        <li>
          <div className="hover:bg-slate-800/50">
            <SaveIcon />
          </div>
        </li>
        <li>
          <div className="hover:bg-slate-800/50">
            <InfoIcon />
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
