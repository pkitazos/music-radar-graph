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
  color: { H: number; S: number; L: number };
}

const RadarChart = ({ labels, values, color }: props) => {
  const isLarge = useMediaQuery("(min-width: 1024px)");

  const data = {
    labels: [...labels],
    datasets: [
      {
        data: [...values],
        backgroundColor: `hsla(${color.H}, ${color.S}%, ${color.L}%, 20%)`,
        borderColor: `hsl(${color.H}, ${color.S}%, ${color.L}%)`,
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
