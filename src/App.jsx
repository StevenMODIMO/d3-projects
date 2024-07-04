import BarChart from "./components/BarChart";
import ScatterPlot from "./components/ScatterPlot";
import HeatMap from './components/HeatMap'
import ChorePloth from "./components/ChoroPleth";

export default function App() {
  return (
    <main className="bg-black opacity-90 h-screen p-10 overflow-auto gap-3 justify-center">
      <BarChart />
      <ScatterPlot />
      <HeatMap />
      <ChorePloth />
    </main>
  );
}
