import { GraphIcon, HomeIcon, InfoIcon, PlusIcon } from "~/components/SVGs";
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
    if (selected === i) return "text-accent";
    return "";
  };
  return (
    <div className="absolute top-0">
      <ul className="menu rounded-box w-max gap-1 bg-neutral p-2">
        <li>
          <div>
            <HomeIcon />
          </div>
        </li>
        <li>
          <div>
            <InfoIcon />
          </div>
        </li>
        <li className="tooltip tooltip-right" data-tip="create new Graph">
          <div
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
                className={colorFill(i)}
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
