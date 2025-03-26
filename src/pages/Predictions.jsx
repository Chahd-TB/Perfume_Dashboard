import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Predictions = () => {
  const [selectedPerfume, setSelectedPerfume] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [perfumeType, setPerfumeType] = useState('');
  const [gender, setGender] = useState('');

  // Sample data - replace with actual data in production
  const data = [
    { name: 'Jan', sales: 4000, prediction: 4200, price: 150 },
    { name: 'Feb', sales: 3000, prediction: 3500, price: 155 },
    { name: 'Mar', sales: 2000, prediction: 2800, price: 145 },
    { name: 'Apr', sales: 2780, prediction: 3000, price: 160 },
    { name: 'May', sales: 1890, prediction: 2200, price: 165 },
    { name: 'Jun', sales: 2390, prediction: 2600, price: 170 },
    { name: 'Jul', sales: 3490, prediction: 3800, price: 175 },
  ];

  const brands = [
    "Chanel",
    "Dior",
    "Gucci",
    "YSL",
    "Tom Ford",
    "Hermès",
    "Prada",
    "Versace"
  ];

  const types = [
    "Eau de Parfum",
    "Eau de Toilette",
    "Parfum",
    "Cologne"
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-[#272727] ">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
          <div className="relative z-10 bg-white/100 backdrop-blur-lg p-6 rounded-xl dark:bg-[#1e1e1e] dark:text-gray-300">
            <h1 className="text-3xl font-bold text-black mb-2  dark:text-gray-300">Sales Predictions</h1>
            <p className="text-black-100">Analyze and predict perfume sales trends</p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="prism-card p-6 rounded-xl dark:bg-[#1e1e1e] dark:text-gray-300">
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Gender</label>
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 dark:bg-[#1e1e1e]"
              >
                <option value="women">Women's Perfumes</option>
                <option value="men">Men's Perfumes</option>
              </select>
            </div>

            <div className="prism-card p-6 rounded-xl dark:bg-[#1e1e1e] dark:text-gray-300">
              <label className="block text-sm font-medium text-gray-700 mb-2  dark:text-gray-300">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 dark:bg-[#1e1e1e]"
              >
                <option value="">Select a brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="prism-card p-6 rounded-xl dark:bg-[#1e1e1e] dark:text-gray-300">
              <label className="block text-sm font-medium text-gray-700 mb-2  dark:text-gray-300">Type</label>
              <select
                value={perfumeType}
                onChange={(e) => setPerfumeType(e.target.value)}
                className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 dark:bg-[#1e1e1e]"
              >
                <option value="">Select type</option>
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="prism-card p-6 rounded-xl dark:bg-[#1e1e1e] dark:text-gray-300">
              <label className="block text-sm font-medium text-gray-700 mb-2  dark:text-gray-300">Perfume Name</label>
              <input
                type="text"
                value={selectedPerfume}
                onChange={(e) => setSelectedPerfume(e.target.value)}
                placeholder="Enter perfume name"
                className="w-full p-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 dark:bg-[#1e1e1e]"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="prism-card p-6 rounded-xl col-span-2 dark:bg-[#1e1e1e] dark:text-gray-300">
              <h2 className="text-xl font-semibold mb-4 text-purple-800">Sales Prediction Trend</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#8884d8" 
                      name="Actual Sales"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="prediction" 
                      stroke="#82ca9d" 
                      name="Predicted Sales"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              <div className="prism-card p-6 rounded-xl dark:bg-[#1e1e1e] dark:text-gray-300">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Predicted Revenue</h3>
                <p className="text-3xl font-bold gradient-text">$24,500</p>
                <p className="text-sm text-purple-600 mt-1">+12% from last period</p>
              </div>
              
              <div className="prism-card p-6 rounded-xl dark:bg-[#1e1e1e] dark:text-gray-300">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Average Price</h3>
                <p className="text-3xl font-bold gradient-text">$165</p>
                <p className="text-sm text-purple-600 mt-1">Based on current selection</p>
              </div>
              
              <div className="prism-card p-6 rounded-xl dark:bg-[#1e1e1e] dark:text-gray-300">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Confidence Score</h3>
                <p className="text-3xl font-bold gradient-text">92%</p>
                <p className="text-sm text-purple-600 mt-1">High accuracy prediction</p>
              </div>
            </div>
          </div>

          <div className="mt-8 prism-card p-6 rounded-xl dark:bg-[#1e1e1e] ">
            <h2 className="text-xl font-semibold mb-4 text-purple-800 ">Additional Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2 dark:text-gray-300">Top Selling Location</h4>
                <p className="text-lg font-semibold text-purple-600">United States</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2 dark:text-gray-300">Available Stock</h4>
                <p className="text-lg font-semibold text-purple-600">1,234 units</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2 dark:text-gray-300">Last Updated</h4>
                <p className="text-lg font-semibold text-purple-600">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Predictions;