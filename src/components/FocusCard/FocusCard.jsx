import React from "react";

const FocusCard = () => {
  return (
    <div className="w-80 rounded-xl shadow-lg bg-gradient-to-b from-black/70 to-transparent p-6 text-center relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-white">
        <div className="text-5xl mb-4"></div>
        <h2 className="text-xl font-semibold">Focus on your day</h2>
        <p className="text-sm mt-2">
          Get things done with My Day, a list that refreshes every day.
        </p>
      </div>
    </div>
  );
};

export default FocusCard;