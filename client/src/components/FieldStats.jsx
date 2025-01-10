import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function FieldStats({ aiAnalysis }) {
  const yieldData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Crop Yield",
        data: Array(6)
          .fill(0)
          .map(() => Math.floor(Math.random() * (5500 - 4000) + 4000)),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const healthMetrics = {
    labels: ["Soil Health", "Disease Risk", "Pest Risk", "Growth"],
    datasets: [
      {
        label: "Field Health Metrics",
        data: [
          aiAnalysis?.soilHealth?.score || 0,
          100 - (aiAnalysis?.cropHealth?.diseaseRisk || 0),
          100 - (aiAnalysis?.cropHealth?.pestRisk || 0),
          aiAnalysis?.cropHealth?.growthRate || 0,
        ],
        backgroundColor: [
          "rgba(34, 197, 94, 0.6)",
          "rgba(239, 68, 68, 0.6)",
          "rgba(234, 179, 8, 0.6)",
          "rgba(59, 130, 246, 0.6)",
        ],
      },
    ],
  };

  const nutrientLevels = {
    labels: ["Nitrogen", "Phosphorus", "Potassium"],
    datasets: [
      {
        data: [
          aiAnalysis?.soilHealth?.nitrogen || 0,
          aiAnalysis?.soilHealth?.phosphorus || 0,
          aiAnalysis?.soilHealth?.potassium || 0,
        ],
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(234, 179, 8, 0.8)",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Yield Trends
        </h3>
        <div className="h-64">
          <Line data={yieldData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Health Metrics
        </h3>
        <div className="h-64">
          <Bar data={healthMetrics} options={chartOptions} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Nutrient Distribution
        </h3>
        <div className="h-64">
          <Doughnut
            data={nutrientLevels}
            options={{
              ...chartOptions,
              cutout: "60%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
