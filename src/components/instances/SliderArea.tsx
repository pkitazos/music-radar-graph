/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Dispatch, SetStateAction } from "react";
import { RangeSlider } from "~/components";
import { useMediaQuery } from "~/hooks";
import { generateNumerals } from "~/utils";

interface props {
  chartData: number[];
  setChartData: Dispatch<SetStateAction<number[]>>;
  fieldNames: string[];
}

const SliderArea = ({ chartData, fieldNames, setChartData }: props) => {
  const numerals = generateNumerals(fieldNames);

  const isLarge = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      <div className="w-max">
        {chartData.map((item, i) => (
          <RangeSlider
            key={i}
            label={
              <div>
                {isLarge && `${numerals[i]!} - `} {fieldNames[i]}
              </div>
            }
            sliderVal={item}
            setOuter={(x) => {
              const clone = [...chartData];
              clone[i] = x;
              setChartData(clone);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default SliderArea;
