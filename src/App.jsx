import BarChart from "./components/BarChart";
import ScatterPlot from "./components/ScatterPlot";
import HeatMap from './components/HeatMap'

export default function App() {
  return (
    <main className="bg-black opacity-90 h-screen p-10 flex gap-3 justify-center">
      <BarChart />
      <ScatterPlot />
      <HeatMap />
    </main>
  );
}
