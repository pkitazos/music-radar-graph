import Link from "next/link";
import { useState } from "react";

import { RadarGraph, SliderArea } from "~/components";
import { api, slugify } from "~/utils";

interface props {
  title: string;
  templateID: string;
  aggregateTemplateData: {
    fieldNames: string[];
    fieldValues: number[];
  };
  fixedHEXColor: string;
}

const InstanceArea = ({
  title,
  templateID,
  aggregateTemplateData,
  fixedHEXColor,
}: props) => {
  const { fieldValues, fieldNames } = aggregateTemplateData;

  const [chartData, setChartData] = useState<number[]>(fieldValues);

  const { mutate } = api.instanceRouter.upsertGraphInstance.useMutation();

  return (
    <div className="grid w-full grid-cols-2">
      <div className="flex items-center justify-center 2xl:justify-end 2xl:pr-40">
        <div className="flex flex-col items-start">
          <h1 className="mb-8 ml-12 font-mono text-4xl font-semibold">
            {title}
          </h1>
          <SliderArea
            chartData={chartData}
            setChartData={setChartData}
            fieldNames={fieldNames}
          />

          <div className="mt-8 flex w-full justify-end gap-8">
            <button
              className="btn w-32 font-mono text-xl font-semibold"
              onClick={() => {
                setChartData([...fieldValues]);
              }}
            >
              reset
            </button>
            <Link
              href={`/graphs/${slugify(title)}`}
              className="btn-primary btn w-32 font-mono text-xl font-semibold text-pink-950"
            >
              <button
                onClick={() =>
                  mutate({ graphTemplateID: templateID, ratings: chartData })
                }
              >
                SAVE
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center 2xl:justify-start">
        <div className="w-full max-w-4xl md:w-max md:pt-3 lg:h-max lg:w-3/5 lg:pt-0 xl:w-4/5">
          <RadarGraph
            data={chartData}
            labels={fieldNames}
            prevData={fieldValues}
            maxRating={10}
            HEXcolor={fixedHEXColor}
          />
        </div>
      </div>
    </div>
  );
};

export default InstanceArea;
