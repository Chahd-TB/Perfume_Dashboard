import React, { useEffect, useRef } from "react";
import "../styles/style.css";
import ItemsList from "../components/ItemsList"; 

import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  ScatterController,
  PointElement,
  Title,
} from "chart.js";

// Register the required Chart.js components
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  ScatterController,
  PointElement,
  Title
);

const Charts = () => {
  // Chart references
  const barRef = useRef(null);
  const barTrendRef = useRef(null);
  const brandRef = useRef(null);
  const perfumeRef = useRef(null);
  const scatterRef1 = useRef(null);
  const scatterRef2 = useRef(null);

  useEffect(() => {
    // Ensure all refs exist before accessing them
    if (!barRef.current || !barTrendRef.current || !scatterRef1.current || !scatterRef2.current || !brandRef.current || !perfumeRef.current) return;

    // Check for dark mode
    const isDarkMode = document.documentElement.classList.contains("dark");

    // Select all elements with the "removeprism" class
    const elements = document.querySelectorAll(".removeprism");

    elements.forEach((el) => {
      if (el.classList.contains("removeprism")) {
        if (isDarkMode) {
          el.classList.remove("prism-card");
        } else {
          el.classList.add("prism-card");
        }
      }
    });

    // Get canvas contexts
    const ctx1 = barRef.current.getContext("2d");
    const ctx2 = barTrendRef.current.getContext("2d");
    const ctx3 = scatterRef1.current.getContext("2d");
    const ctx4 = scatterRef2.current.getContext("2d");
    const ctx5 = brandRef.current.getContext("2d");
    const ctx6 = perfumeRef.current.getContext("2d");

    // Destroy previous charts to prevent duplication
    [barRef, barTrendRef, scatterRef1, scatterRef2, brandRef, perfumeRef].forEach(
      (ref) => Chart.getChart(ref.current)?.destroy()
    );

    // Gradient for bar charts
    const gradient = ctx1.createLinearGradient(0, 0, 500, 0);
    gradient.addColorStop(0, "#a855f7");
    gradient.addColorStop(1, "#7e22ce");

    const labels = ["Jan", "Feb", "Mar", "Apr", "May"];
    const data = [19, 12, 3, 5, 9];

    // Custom background color plugin (detects dark mode)
    const backgroundColorPlugin = {
      id: "customCanvasBackgroundColor",
      beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext("2d");
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";

        ctx.fillStyle = isDarkMode ? "#1e1e1e" : "white";
        ctx.fillRect(0, 0, chart.width, chart.height);

        ctx.restore();
      },
    };

    // Chart configurations
    const chartConfigs = [
      { ctx: ctx1, type: "bar", title: "Top Women's Perfumes Brand by Sales" },
      { ctx: ctx2, type: "bar", title: "Women's Perfumes Sales by Price Range" },
      { ctx: ctx5, type: "bar", title: "Top 10 Best-Selling Women's Perfumes", options: { indexAxis: "y" } },
      { ctx: ctx6, type: "bar", title: "Women's Perfumes: Sales by Type" },
      {
        ctx: ctx3,
        type: "scatter",
        title: "Women's Perfumes Price vs Sales",
        data: [
          { x: 10, y: 20 }, { x: 15, y: 25 }, { x: 20, y: 10 }, { x: 25, y: 30 }, { x: 30, y: 15 },
        ],
      },
      {
        ctx: ctx4,
        type: "scatter",
        title: "Women's Perfumes Availability vs Sales",
        data: [
          { x: 5, y: 10 }, { x: 10, y: 20 }, { x: 15, y: 5 }, { x: 20, y: 25 }, { x: 25, y: 15 },
        ],
      },
    ];

    chartConfigs.forEach(({ ctx, type, title, options = {}, data: scatterData }) => {
      new Chart(ctx, {
        type,
        data: {
          labels: type === "scatter" ? undefined : labels,
          datasets: [
            {
              label: "Sales",
              data: scatterData || data,
              backgroundColor: type === "scatter" ? "#a855f7" : gradient,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { title: { display: true, text: type === "scatter" ? "X-Axis" : "Months" } },
            y: { title: { display: true, text: type === "scatter" ? "Y-Axis" : "Sales" } },
          },
          plugins: {
            legend: { display: true },
            title: { display: true, text: title, font: { size: 15 }, padding: { bottom: 20 } },
          },
          ...options,
        },
        plugins: [backgroundColorPlugin],
      });
    });
  }, []);

  return (
    <div className="max-[800px]:ml-5">
      {/* First row of charts */}
      <div className="flex max-[800px]:flex-col ">
        <div className="removeprism prism-card chart-container rounded-lg dark:bg-[#1e1e1e]">
          <canvas ref={scatterRef1} className="p-5 chart"></canvas>
        </div>
        <div className="removeprism prism-card chart-container rounded-lg dark:bg-[#1e1e1e]">
          <canvas ref={barTrendRef} className="p-5 pb-0 chart"></canvas>
        </div>
        <div className="removeprism prism-card chart-container rounded-lg dark:bg-[#1e1e1e]">
          <canvas ref={barRef} className="p-5 pb-0 chart"></canvas>
        </div>
      </div>

      {/* Second row of charts */}
      <div className="flex max-[800px]:flex-col">
        <div className="removeprism prism-card ch rounded-lg max-[800px]:w-[95%] max-[800px]:ml-0 dark:bg-[#1e1e1e]">
          <canvas ref={scatterRef2} className="p-5 chart"></canvas>
        </div>

        {/* Brands section */}
        <div className="removeprism prism-card option w-[30%] p-5 mt-5 dark:bg-[#1e1e1e] dark:text-gray-300 bg-white max-[800px]:w-[95%] rounded-lg flex flex-col justify-between">
          <div>
            <ItemsList />
          </div>
        </div>
      </div>

      {/* Third row of charts */}
      <div className="flex justify-between max-[800px]:flex-col">
        <div className="removeprism prism-card charts rounded-lg dark:bg-[#1e1e1e]">
          <canvas ref={brandRef} className="p-5 chart"></canvas>
        </div>
        <div className="removeprism prism-card charts rounded-lg dark:bg-[#1e1e1e]">
          <canvas ref={perfumeRef} className="p-5 chart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Charts;
