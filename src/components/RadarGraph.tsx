import { Radar } from "@jarp/ivy";
import { FC } from "react";

interface props {
  data: number[];
  labels: string[];
  prevData?: number[];
  maxRating: number;
}

const RadarGraph: FC<props> = ({ data, labels, prevData, maxRating }) => {
  return (
    <div>
      <Radar min={1} max={maxRating} numSpokes={labels.length}>
        <Radar.Spokes className="stroke-stone-700/50 stroke-[0.5]" />
        <Radar.Scale />
        <Radar.Gridlines.Circle className="stroke-stone-700/50 stroke-[0.5]" />
        <Radar.Labels labels={labels} />

        <Radar.plot.Line
          data={data}
          className="fill-orange-500/50 stroke-orange-500 stroke-[0.5]"
        />
        <Radar.plot.Dot
          data={data}
          className="scale-50 fill-orange-500 transition-all duration-500 hover:scale-75 hover:shadow-md"
        />
        {prevData && (
          <Radar.plot.Line
            data={prevData}
            className="fill-slate-200/50 stroke-slate-400"
          />
        )}
      </Radar>
    </div>
  );
};

export default RadarGraph;
