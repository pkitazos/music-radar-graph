import { Radar } from "@jarp/ivy";

interface props {
  data: number[];
  labels: string[];
  prevData?: number[];
  maxRating: number;
  HEXcolor: string;
}

const RadarGraph = ({ data, labels, prevData, maxRating, HEXcolor }: props) => {
  let fill = `fill-[${HEXcolor}]`;
  let stroke = `stroke-[${HEXcolor}]`;

  return (
    <div>
      <Radar min={1} max={maxRating} numSpokes={labels.length}>
        <Radar.Spokes className="stroke-stone-700/50 stroke-[0.1]" />
        <Radar.Scale />
        <Radar.Gridlines.Circle className="stroke-stone-700/50 stroke-[0.1]" />
        <Radar.Labels labels={labels} />

        <Radar.plot.Line
          data={data}
          className={`${fill}/50 ${stroke} stroke-[0.25]`}
        />
        <Radar.plot.Dot
          data={data}
          className={`scale-50 ${fill} transition-all duration-500 hover:scale-75 hover:shadow-md`}
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
