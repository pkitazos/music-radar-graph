import {
  Chart as ChartJS,
  Filler,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { Radar as ChartJSRadar } from "react-chartjs-2";
import { useMediaQuery } from "~/hooks";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

interface props {
  values: number[];
  labels: string[];
}

const RadarChart = ({ labels, values }: props) => {
  const isLarge = useMediaQuery("(min-width: 1024px)");

  const data = {
    labels: [...labels],
    datasets: [
      {
        data: [...values],
        backgroundColor: "hsla(19, 95%, 53%, 20%)",
        borderColor: "hsl(19, 95%, 53%)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        animate: true,
        min: 0,
        max: 10,
        ticks: {
          display: isLarge,
          stepSize: 1,
          showLabelBackdrop: false,
        },
        grid: {
          color: "rgba(255, 255, 255, .1)",
          circular: true,
        },
        angleLines: {
          lineWidth: 1,
          display: true,
          color: "rgba(255, 255, 255, .05)",
        },
      },
    },
  };

  return (
    <>
      <ChartJSRadar data={data} options={options} />
    </>
  );
};

export default RadarChart;
