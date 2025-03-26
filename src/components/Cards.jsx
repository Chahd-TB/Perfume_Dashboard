import React from "react";

const cardData = [
  { icon: "groups", title: "Users", value: "1,245" },
  { icon: "shopping_cart", title: "Orders", value: "530" },
  { icon: "attach_money", title: "Revenue", value: "$12,300" },
  { icon: "trending_up", title: "Growth", value: "+15%" },
];

const Cards = () => {
  return (
    <div className="rounded-2xl mb-8 p-8 relative dark:text-gray-300 overflow-hidden"style={{backgroundSize: 'cover',backgroundImage: 'url("/images/photo_2025-03-21_18-37-17.jpg")', backgroundPosition: 'center'}}>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2 dark:text-[#1e1e1e]">Perfumes Dashboard</h1>
            <p className="text-purple-100 dark:text-[#2c2c2c]">Welcome to your dashboard.</p>
          </div>
          <div className="mt-8">
            
                <div className="flex justify-around w-full flex-wrap">
            {cardData.map((card, index) => (
            <div key={index} className="bg-white dark:bg-[#1e1e1e] shadow-md  border-gray-300 rounded-lg p-3 flex items-center space-x-3 w-[180px] h-[110px] mb-5 mt-5 justify-around">
                <span className="material-symbols-outlined text-gradient text-4xl">
                  {card.icon}
                </span>
                <div>
                  <h3 className="text-gray-700 text-sm font-semibold dark:text-gray-300">{card.title}</h3>
                  <p className="text-xl font-bold">{card.value}</p>
                </div>
              </div>
            ))}
          </div>
            
          </div>
        </div>
  );
};

export default Cards;