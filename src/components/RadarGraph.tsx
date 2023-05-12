import { Radar } from "@jarp/ivy";

interface props {
  data: number[];
  labels: string[];
  prevData?: number[];
  maxRating: number;
  HEXcolor: string;
}

const RadarGraph = ({ data, labels, prevData, maxRating, HEXcolor }: props) => {
  return (
    <div>
      <Radar min={1} max={maxRating} numSpokes={labels.length}>
        <Radar.Spokes className="stroke-stone-700/50 stroke-[0.1]" />
        <Radar.Scale className="fill-none" />
        <Radar.Gridlines.Circle className="stroke-stone-700/50 stroke-[0.1]" />
        <Radar.Labels labels={labels} className="fill-none" />
        {prevData && (
          <Radar.plot.Line
            data={prevData}
            className="fill-slate-600/50 stroke-slate-600 stroke-[0.25]"
          />
        )}
        <Radar.plot.Line
          data={data}
          className="stroke-[0.25]"
          style={{ fill: `${HEXcolor}80`, stroke: HEXcolor }}
        />
        <Radar.plot.Dot
          data={data}
          className={`scale-50 transition-all duration-500 hover:scale-75 hover:shadow-md`}
          style={{ fill: HEXcolor }}
        />
      </Radar>
    </div>
  );
};

export default RadarGraph;
