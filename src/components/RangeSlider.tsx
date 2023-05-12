import { ReactNode, useEffect, useState } from "react";

import { useDebounce, useMediaQuery } from "~/hooks";

interface props {
  label: ReactNode;
  sliderVal: number;
  setOuter: (x: number) => void;
}

const RangeSlider = ({ label, sliderVal, setOuter }: props) => {
  const [preProcess, setPreProcess] = useState("5");

  const isMedium = useMediaQuery("(min-width: 768px)");

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOuter(parseInt(e.target.value));
  };
  const validate = useDebounce((e: React.ChangeEvent<HTMLInputElement>) => {
    let num = parseFloat(e.target.value);
    if (Number.isNaN(num)) {
      setPreProcess("5");
      setOuter(5);
      return;
    }

    if (num > 10) {
      setPreProcess("10");
      setOuter(10);
      return;
    }
    if (num < 1) {
      setPreProcess("1");
      setOuter(1);
      return;
    }
    setOuter(num);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreProcess(e.target.value);
    validate(e);
  };

  useEffect(() => {
    setPreProcess(sliderVal.toString());
  }, [sliderVal]);

  return (
    <div
      className={`my-2 flex flex-row items-end justify-center gap-x-4 sm:my-3 md:mx-auto md:my-2 md:w-[40rem] lg:my-5 lg:w-full lg:items-center`}
    >
      <input
        type="number"
        min={1}
        max={10}
        value={preProcess}
        onChange={handleInputChange}
        className={`input-ghost input w-1/6 bg-dark-base text-right text-xl text-secondary sm:w-1/12 lg:mt-2.5 lg:w-1/6`}
      />
      <div className="w-10/12">
        <div className="m-2 font-mono">{label}</div>
        <input
          type="range"
          min="1"
          max="10"
          value={sliderVal}
          className={`range ${!isMedium && "range-sm"} `}
          step="1"
          onChange={handleSliderChange}
        />
        <div className="mx-2 hidden justify-between text-xs lg:flex">
          {Array.from(Array(10)).map((_, i) => (
            <span key={i} className="font-mono text-[8px] text-gray-500">
              |
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
