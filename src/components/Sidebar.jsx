import React, { useState, useEffect } from "react";


const Sidebar = () => {


  // dark mood 
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


  return (
    <section className="fixed p-5 max-[700px]:p-0 w-[20%] h-screen flex flex-col justify-between 
                        mr-10 max-[700px]:bottom-0 max-[700px]:left-0 max-[700px]:w-full dark:text-gray-300
 
                        max-[700px]:h-20 max-[700px]:flex-row max-[700px]:items-center max-[700px]:justify-around bg-white dark:bg-[#1e1e1e] shadow-lg">
      {/* Logo (Hidden on small screens) */}
      <div className="max-[700px]:hidden">
        <img src="/images/—Pngtree—spa logo_8452078.png" alt="LOGO" className="w-full h-45 -mt-2 -ml-2" />
      </div>

      <button
      onClick={() => {
        setDarkMode(!darkMode);
        setTimeout(() => window.location.reload(), 100);
      }}
      className="py-2 rounded-md text-black dark:text-white text-left  transition-all duration-300 ease-in-out 
            hover:bg-[#f5e8ff] dark:hover:bg-[#3a393a] hover:rounded-lg hover:px-2 hover:py-2 hover:scale-105">
      <span>{darkMode ? "☀️" : "🌙"}</span>
      <span className="max-[700px]:hidden">{darkMode ? " Light Mode" : " Dark Mode"}</span>
    </button>

      {/* Navigation Links */}
      <div>
      <ul className="space-y-6 max-[700px]:space-y-0 max-[700px]:flex max-[700px]:space-x-6 max-[530px]:space-x-10">
          <li className="flex items-center space-x-2 max-[700px]:space-x-1 
            transition-all duration-300 ease-in-out 
            hover:bg-[#f5e8ff] dark:hover:bg-[#3a393a] hover:rounded-lg hover:px-2 hover:py-2 hover:scale-105">
            <a href="/"><span className="material-symbols-outlined  text-gradient ">home_app_logo</span></a>
            <a href="/" className="max-[530px]:hidden">Home</a>
          </li>
          <li className="flex items-center space-x-2 max-[700px]:space-x-1 
            transition-all duration-300 ease-in-out 
            hover:bg-[#f5e8ff] dark:hover:bg-[#3a393a] hover:rounded-lg hover:px-2 hover:py-2 hover:scale-105">
            <a href="/women"><span className="material-symbols-outlined text-gradient">woman</span></a>
            <a href="/women" className="max-[530px]:hidden">Women</a>
          </li>
          <li className="flex items-center space-x-2 max-[700px]:space-x-1 
            transition-all duration-300 ease-in-out 
            hover:bg-[#f5e8ff] dark:hover:bg-[#3a393a] hover:rounded-lg hover:px-2 hover:py-2 hover:scale-105">
            <a href="/men"><span className="material-symbols-outlined text-gradient">man</span></a>
            <a href="/men" className="max-[530px]:hidden">Men</a>
          </li>
          <li className="flex items-center space-x-2 max-[700px]:space-x-1 
            transition-all duration-300 ease-in-out 
            hover:bg-[#f5e8ff] dark:hover:bg-[#3a393a] hover:rounded-lg hover:px-2 hover:py-2 hover:scale-105">
            <a href="/predictions"><span className="material-symbols-outlined text-gradient">troubleshoot</span></a>
            <a href="/predictions" className="max-[530px]:hidden">Predictions</a>
          </li>
          <li className="hidden space-x-1 max-[700px]:flex max-[700px]:items-center 
            transition-all duration-300 ease-in-out 
            hover:bg-[#f5e8ff] dark:hover:bg-[#3a393a] hover:rounded-lg hover:px-2 hover:py-2 hover:scale-105">
            <a href="#"><span className="material-symbols-outlined text-gradient">logout</span></a>
            <a href="#" className="text-gradient max-[530px]:hidden">Logout</a>
          </li>
     </ul>

      </div>

      {/* Logout (Visible on small screens) */}
      <ul className=" max-[700px]:hidden">
      <li className="flex items-center space-x-2
        transition-all duration-300 ease-in-out 
        hover:bg-[#f5e8ff] dark:hover:bg-[#3a393a] hover:rounded-lg hover:px-2 hover:py-2 hover:scale-105">
        <span className="material-symbols-outlined text-gradient dark:text-gray-300">logout</span>
        <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 
                              text-transparent bg-clip-text dark:text-gray-300">
          Logout
        </a>
      </li>

      </ul>
    </section>
  );
};

export default Sidebar;
