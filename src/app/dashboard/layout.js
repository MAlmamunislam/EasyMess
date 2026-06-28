import React from "react";
import DashboardSideBar from "./DashboardSideBar";

const layout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* Sidebar */}
      <aside className="w-full md:w-72 border-r bg-white">
        <DashboardSideBar />
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 md:p-6 bg-gray-50">
        {children}
      </main>

    </div>
  );
};

export default layout;