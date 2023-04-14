import { useEffect, useRef, useState } from "react";
import { AlbumModal, RadarChart, RangeSlider } from "~/components";
import { MusicIcon } from "~/components/SVGs";
import { useMediaQuery, useModal } from "~/hooks";

interface props {
  chartData: chartData[];
  setChartData: React.Dispatch<React.SetStateAction<chartData[]>>;
  selectedChart: number;
}

const GraphMaker = ({ chartData, setChartData, selectedChart }: props) => {
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const numerals = ["I", "II", "III", "IV", "VI", "VI"];
  const keys = [
    "overall",
    "strum",
    "depression",
    "society",
    "bleep",
    "anxiety",
  ];

  const fullLabels = [
    "Overall",
    "Strum Strum",
    "Depression",
    "We Live in a Society",
    "Bleep Bloop",
    "Anxiety",
  ];

  const needsLabels = !useMediaQuery("(min-width: 1024px)");
  const labels = needsLabels ? numerals : fullLabels;
  const { overall, strum, depression, society, bleep, anxiety } =
    chartData[selectedChart];

  const updateName = (name: string) => {
    let clone = [...chartData];
    clone[selectedChart].albumName = name;
    setChartData(clone);
  };

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
    <div className="flex h-screen flex-col justify-center gap-3 px-8 py-10 sm:gap-1 md:items-center md:gap-3 lg:flex-row-reverse lg:gap-5 xl:gap-14 xl:py-16">
      <div className="flex h-2/5 justify-center md:w-max md:pt-3 lg:h-max lg:w-1/2 lg:pt-0">
        <RadarChart
          labels={labels}
          values={[overall, strum, depression, society, bleep, anxiety]}
        />
      </div>
      <div className="flex flex-col md:w-full md:flex-col md:place-items-center lg:w-1/3 lg:min-w-fit">
        <div>
          <button
            ref={modalButtonRef}
            className="btn items-center gap-3"
            onClick={useModal(<AlbumModal setAlbum={updateName} />)}
          >
            {chartData[selectedChart].albumName || "Choose an album"}
            <MusicIcon />
          </button>
        </div>
        <div className={`w-full px-3`}>
          {keys.map((key, i) => (
            <RangeSlider
              key={i}
              label={
                <div>
                  {needsLabels && numerals[i] + " - "} {fullLabels[i]}
                </div>
              }
              sliderVal={
                chartData[selectedChart][key as keyof chartData] as number
              }
              setOuter={(x) => {
                let clone = [...chartData];
                //@ts-ignore
                clone[selectedChart][key as keyof chartData] = x;
                setChartData(clone);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraphMaker;
