import { useState } from "react";
import { GraphMaker, SideMenu } from "./components";
import { defaultChart } from "./helpers/data";
import { ModalProvider } from "./hooks/useModal";

function App() {
  const [selected, setSelected] = useState(0);

  const [chartData, setChartData] = useState<chartData[]>([
    { ...defaultChart },
  ]);

  return (
    <ModalProvider>
      <div className='relative'>
        <SideMenu
          selected={selected}
          savedCharts={chartData}
          setSavedCharts={setChartData}
          setSelectedChart={setSelected}
        />
        <GraphMaker
          chartData={chartData}
          setChartData={setChartData}
          selectedChart={selected}
        />
      </div>
    </ModalProvider>
  );
}

export default App;
