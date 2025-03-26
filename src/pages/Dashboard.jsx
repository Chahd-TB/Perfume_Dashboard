import React from "react";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards";
import Charts from "../components/Charts";
import { LineChart, Line, PieChart, Pie, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  return (
    <div className="flex max-[700px]:flex-col min-h-screen bg-gray-100 dark:bg-[#272727]">
      <div className="z-10 max-[700px]:rounded-xl">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 w-[70%] max-[700px]:w-full ml-[20%] max-[700px]:ml-0 max-[800px]:pb-[100px] pb-50">
        <Cards />
        <Charts />
      </div>
    </div>
  );
};

export default Dashboard;
