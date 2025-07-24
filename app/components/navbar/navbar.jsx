import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md rounded-b-lg px-6 py-3 flex items-center justify-between min-h-[10vh]">
      <div>
        <span className="text-2xl font-semibold mx-2">Company Name</span>
      </div>
      <div className="flex items-center">
        <h1  className="text-base font-medium mx-2 px-2 py-1 rounded transition-colors">Home</h1>
        <h1  className="text-base font-medium mx-2 px-2 py-1 rounded transition-colors">App</h1>
        <h1  className="text-base font-medium mx-2 px-2 py-1 rounded transition-colors">API</h1>
      </div>
    </nav>
  );
};

export default Navbar;
