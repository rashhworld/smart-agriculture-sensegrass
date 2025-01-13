// Import necessary components and modules from chart.js and react-chartjs-2
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

// Register Chart.js components globally to use them
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

// Component to render field statistics charts
export default function FieldStats({ aiAnalysis }) {
  // Yield data for the line chart
  const yieldData = {
    labels: ["January", "February", "March", "April", "May", "June"], // X-axis labels
    datasets: [
      {
        label: "Crop Yield", // Dataset label
        data: Array(6) // Generate random crop yield data
          .fill(0)
          .map(() => Math.floor(Math.random() * (5500 - 4000) + 4000)), // Random values between 4000 and 5500
        borderColor: "rgb(34, 197, 94)", // Line color (green)
        backgroundColor: "rgba(34, 197, 94, 0.1)", // Area under the line (light green)
        tension: 0.3, // Smoothing factor for the line
        fill: true, // Fill the area under the line
      },
    ],
  };

  // Health metrics data for the bar chart
  const healthMetrics = {
    labels: ["Soil Health", "Disease Risk", "Pest Risk", "Growth"], // Categories on the X-axis
    datasets: [
      {
        label: "Field Health Metrics", // Dataset label
        data: [
          aiAnalysis?.soilHealth?.score || 0, // Soil health score
          100 - (aiAnalysis?.cropHealth?.diseaseRisk || 0), // Disease risk (converted to health score)
          100 - (aiAnalysis?.cropHealth?.pestRisk || 0), // Pest risk (converted to health score)
          aiAnalysis?.cropHealth?.growthRate || 0, // Growth rate score
        ],
        backgroundColor: [
          "rgba(34, 197, 94, 0.6)", // Green for soil health
          "rgba(239, 68, 68, 0.6)", // Red for disease risk
          "rgba(234, 179, 8, 0.6)", // Yellow for pest risk
          "rgba(59, 130, 246, 0.6)", // Blue for growth
        ],
      },
    ],
  };

  // Nutrient levels data for the doughnut chart
  const nutrientLevels = {
    labels: ["Nitrogen", "Phosphorus", "Potassium"], // Nutrients
    datasets: [
      {
        data: [
          aiAnalysis?.soilHealth?.nitrogen || 0, // Nitrogen level
          aiAnalysis?.soilHealth?.phosphorus || 0, // Phosphorus level
          aiAnalysis?.soilHealth?.potassium || 0, // Potassium level
        ],
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)", // Red for nitrogen
          "rgba(59, 130, 246, 0.8)", // Blue for phosphorus
          "rgba(234, 179, 8, 0.8)", // Yellow for potassium
        ],
      },
    ],
  };

  // Shared chart options
  const chartOptions = {
    responsive: true, // Ensure the chart is responsive
    maintainAspectRatio: false, // Do not maintain a fixed aspect ratio
    plugins: {
      legend: {
        position: "top", // Legend position
        labels: {
          usePointStyle: true, // Use point markers in the legend
          padding: 20, // Padding around legend labels
          font: {
            size: 12, // Font size for legend labels
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start the Y-axis at 0
        grid: {
          display: true, // Show grid lines on the Y-axis
          drawBorder: false, // Hide the border
        },
      },
      x: {
        grid: {
          display: false, // Hide grid lines on the X-axis
        },
      },
    },
  };

  // Render the charts in a grid layout
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Line chart for yield trends */}
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Yield Trends
        </h3>
        <div className="h-64">
          <Line data={yieldData} options={chartOptions} />
        </div>
      </div>

      {/* Bar chart for health metrics */}
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Health Metrics
        </h3>
        <div className="h-64">
          <Bar data={healthMetrics} options={chartOptions} />
        </div>
      </div>

      {/* Doughnut chart for nutrient distribution */}
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Nutrient Distribution
        </h3>
        <div className="h-64">
          <Doughnut
            data={nutrientLevels}
            options={{
              ...chartOptions, // Inherit shared options
              cutout: "60%", // Adjust doughnut chart's inner cutout
            }}
          />
        </div>
      </div>
    </div>
  );
}
