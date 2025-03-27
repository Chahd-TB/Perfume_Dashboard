import React, { useRef, useEffect } from "react";
import Plotly from "plotly.js-dist";
import "../styles/style.css";
import { Chart } from "chart.js/auto";
import { ChoroplethController, GeoFeature } from "chartjs-chart-geo";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards";
import Charts from "../components/Charts";

Chart.register(ChoroplethController, GeoFeature);

const General = () => {
  const chartRefs = useRef({ pie: null, bar: null, map: null });
  const chartsRef = useRef([]);

  useEffect(() => {
    if (!chartRefs.current.pie || !chartRefs.current.bar || !chartRefs.current.map) return;

    chartsRef.current.forEach((chart) => chart?.destroy());
    chartsRef.current = [];

    const isDarkMode = document.documentElement.classList.contains("dark");
    const textColor = isDarkMode ? "#E0E0E0" : "#333";
    const bgColor = isDarkMode ? "#1e1e1e" : "rgba(255, 255, 255, 0.7)";

    const labels = ["Jan", "Feb", "Mar", "Apr", "May"];
    const data = [10, 20, 30, 40, 50];

    const chartConfigs = [
      {
        ref: "pie",
        type: "pie",
        title: "Sales Distribution by Gender",
        dataset: { backgroundColor: ["#7a43fb", "#a47ff9", "#8b5cf6", "#893ad2", "#9f5edf"] },
      },
      {
        ref: "bar",
        type: "bar",
        title: "Top 5 Most Listed Perfumes",
        options: { indexAxis: "y" },
        dataset: { backgroundColor: "#a855f7" },
      },
    ];

    chartConfigs.forEach(({ ref, type, title, options = {}, dataset }) => {
      const ctx = chartRefs.current[ref].getContext("2d");
      const newChart = new Chart(ctx, {
        type,
        data: { labels, datasets: [{ label: "Sales", data, ...dataset, borderWidth: 2 }] },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: textColor } },
            title: { display: true, text: title, font: { size: 15 }, color: textColor },
          },
          scales: type === "bar" ? { x: { ticks: { color: textColor } }, y: { ticks: { color: textColor } } } : {},
          ...options,
        },
      });
      chartsRef.current.push(newChart);
    });

    const mapData = [
      {
        type: "choropleth",
        locations: ["AFG", "USA", "CHN", "RUS", "IND"],
        z: [21.71, 17420.0, 10360.0, 2057.0, 2048.0],
        text: ["Afghanistan", "United States", "China", "Russia", "India"],
        colorscale: [[0, "#4f46e5"], [0.25, "#6366f1"], [0.5, "#8b5cf6"], [0.75, "#a855f7"], [1, "#c084fc"]],
        reversescale: true,
        marker: { line: { color: "rgb(180,180,180)", width: 0.5 } },
      },
    ];

    const layout = {
      responsive: true,
      height: 350,
      paper_bgcolor: bgColor,
      geo: { showframe: false, showcoastlines: false, bgcolor: bgColor },
      margin: { l: 0, r: 0, t: 0, b: 0 },
    };

    Plotly.newPlot(chartRefs.current.map, mapData, layout, { responsive: true });

    return () => {
      chartsRef.current.forEach((chart) => chart?.destroy());
      chartsRef.current = [];
    };
  }, []);

  return (
    <div className="flex max-[700px]:flex-col min-h-screen bg-gray-100 dark:bg-[#272727]">
      <Sidebar className="z-10 max-[700px]:rounded-xl" />
      <div className="flex-1 p-8 w-[70%] max-[700px]:w-full ml-[20%] max-[700px]:ml-0 max-[800px]:pb-[100px] pb-50">
        <Cards />
        <Charts />
        <div className="max-[800px]:ml-5 ml-5">
          <div className="flex max-[800px]:flex-col">
            <div className="removeprism prism-card option h-[250px] w-[33%] dark:bg-[#1e1e1e] dark:text-gray-300 bg-white max-[800px]:w-[95%] rounded-lg flex flex-col justify-between">
              <canvas ref={(el) => (chartRefs.current.pie = el)} className="p-5 chart"></canvas>
            </div>
            <div className="removeprism prism-card ch h-[250px] rounded-lg max-[800px]:w-[95%] mr-0 max-[800px]:ml-0 dark:bg-[#1e1e1e]">
              <canvas ref={(el) => (chartRefs.current.bar = el)} className="p-5 chart"></canvas>
            </div>
          </div>
          <div ref={(el) => (chartRefs.current.map = el)} className="removeprism prism-card h-[350px] bg-white rounded-lg overflow-hidden dark:bg-[#1e1e1e] w-[100%] max-[800px]:w-[95%] shadow-[10px_5px_10px_rgba(0,0,0,0.2)]"></div>
        </div>
      </div>
    </div>
  );
};

export default General;