// Importing required hooks and components
import { useState, useEffect, memo } from "react";
import { getFieldAnalysis } from "../apis/ai";
import FieldStats from "./FieldStats";

// Exporting the memoized AIInsights component
export default memo(function AIInsights({ fieldId }) {
  const [analysis, setAnalysis] = useState(null); // store the analysis data

  // Fetch new analysis data when the fieldId changes
  useEffect(() => {
    (async () => {
      const response = await getFieldAnalysis(fieldId); // API call to fetch analytics data
      setAnalysis(response.analysis); // Update state with the fetched data
    })();
  }, [fieldId]);

  // If analysis data isn't available yet, render nothing
  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Displaying soil health details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Soil Health</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Overall Score</span>
              <span className="font-medium">{analysis.soilHealth.score}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">pH Level</span>
              <span className="font-medium">{analysis.soilHealth.ph}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Organic Matter</span>
              <span className="font-medium">
                {analysis.soilHealth.organicMatter}%
              </span>
            </div>
          </div>
        </div>

        {/* Displaying crop health details */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Crop Health</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Overall Score</span>
              <span className="font-medium">{analysis.cropHealth.score}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Disease Risk</span>
              <span className="font-medium">
                {analysis.cropHealth.diseaseRisk}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Growth Rate</span>
              <span className="font-medium">
                {analysis.cropHealth.growthRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Displaying AI recommendations */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">AI Recommendations</h3>
          <ul className="list-disc ps-4 space-y-2">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="text-gray-600">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Passing analysis data to the FieldStats component */}
      <FieldStats aiAnalysis={analysis} />
    </div>
  );
});
