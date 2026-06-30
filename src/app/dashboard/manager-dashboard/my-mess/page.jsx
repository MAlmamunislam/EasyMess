import React from 'react';

const MessDashboard = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-3xl">
            🏠
          </div>
          <div>
            <h1 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
              Green Villa Mess <span className="text-green-500 text-lg">✓</span>
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm text-gray-500">
              <p>Invite Code: <span className="font-bold text-black">GV83KA</span></p>
              <p>Members: <span className="font-bold text-black">18 / 20</span></p>
              <p>Address: <span className="font-bold text-black">Sherpur</span></p>
            </div>
          </div>
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 w-full md:w-auto">
          Edit Mess
        </button>
      </div>

      {/* Quick Stats */}
      <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { title: "Today's Meals", val: "15", desc: "Meals taken today", color: "bg-green-50" },
          { title: "Pending Request", val: "3", desc: "New pending requests", color: "bg-orange-50" },
          { title: "Bazaar", val: "৳12,500", desc: "Total bazaar amount", color: "bg-purple-50" },
        ].map((item, i) => (
          <div key={i} className={`${item.color} p-5 rounded-2xl border border-gray-100`}>
            <h3 className="text-gray-600 font-medium">{item.title}</h3>
            <p className="text-3xl font-bold my-2">{item.val}</p>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <h2 className="text-xl font-bold mb-4">Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {["Edit InvaiteCode", "View Members", "Generate New Code"].map((action, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md cursor-pointer flex justify-between items-center transition">
            <p className="font-bold">{action}</p>
            <span className="text-xl">→</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessDashboard;