"use client";
import React, { useEffect, useState } from "react";
import { GetUser } from "@/components/action/action";
import { toast } from "sonner";

const ManagerMealDashboard = () => {
  const user = GetUser();
  const userId = user?.user?.id;
  const [data, setData] = useState({ summary: { breakfast: 0, lunch: 0, dinner: 0, guestMeal: 0 }, members: [] });
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const fetchData = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/meals?userId=${userId}&date=${date}`);
      const result = await res.json();
      if (result.success) {
        // সামারি ক্যালকুলেশনে গেস্ট মিল যোগ করা হয়েছে
        const totalBreakfast = result.members.reduce((sum, m) => sum + (m.breakfast ? 1 : 0) + (m.guestBreakfast || 0), 0);
        const totalLunch = result.members.reduce((sum, m) => sum + (m.lunch ? 1 : 0) + (m.guestLunch || 0), 0);
        const totalDinner = result.members.reduce((sum, m) => sum + (m.dinner ? 1 : 0) + (m.guestDinner || 0), 0);
        const totalGuest = result.members.reduce((sum, m) => sum + (m.guestBreakfast + m.guestLunch + m.guestDinner), 0);

        setData({
          summary: { breakfast: totalBreakfast, lunch: totalLunch, dinner: totalDinner, guestMeal: totalGuest },
          members: result.members
        });
      }
    } catch (err) { toast.error("ডাটা লোড করতে সমস্যা হয়েছে"); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (userId) fetchData(); }, [userId, date]);

  // এডিট করার জন্য মডাল ওপেন
  const openEdit = (member) => {
    setEditingMember({ ...member });
    setIsModalOpen(true);
  };

  // সেভ করার ফাংশন
  const handleSave = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/manager/update-meal`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ managerId: userId, ...editingMember, date }),
      });
      if ((await res.json()).success) {
        toast.success("আপডেট সফল!");
        setIsModalOpen(false);
        fetchData();
      }
    } catch (err) { toast.error("আপডেট ফেইলড"); }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🍽️ Manager Meal Dashboard</h1>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mb-6 p-2 border rounded shadow-sm" />

      {loading ? <p>Loading...</p> : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(data.summary).map(([key, val]) => (
              <div key={key} className="p-4 bg-orange-100 rounded-lg text-center shadow-sm">
                <p className="text-xs uppercase font-bold text-orange-800">{key}</p>
                <p className="text-xl font-bold">{val}</p>
              </div>
            ))}
          </div>

          <div className="w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full text-center border-collapse min-w-[500px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Member</th>
                  <th className="p-3">B</th><th className="p-3">L</th><th className="p-3">D</th>
                  <th className="p-3">Guest</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.members.map((m) => (
                  <tr key={m.userId} className="border-t">
                    <td className="p-3 text-left font-medium">{m.name}</td>
                    <td className="p-3">{m.breakfast ? "✅" : "❌"}</td>
                    <td className="p-3">{m.lunch ? "✅" : "❌"}</td>
                    <td className="p-3">{m.dinner ? "✅" : "❌"}</td>
                    <td className="p-3 font-semibold text-orange-600">{m.guestBreakfast + m.guestLunch + m.guestDinner}</td>
                    <td className="p-3"><button onClick={() => openEdit(m)} className="bg-orange-500 text-white px-3 py-1 rounded text-sm">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* মডাল */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-xs">
            <h2 className="font-bold mb-4">Edit {editingMember.name}</h2>
            {['guestBreakfast', 'guestLunch', 'guestDinner'].map((type) => (
              <div key={type} className="flex justify-between mb-3 items-center">
                <span className="capitalize text-sm">{type.replace('guest', '')}</span>
                <div className="flex gap-2">
                  <button onClick={() => setEditingMember({...editingMember, [type]: Math.max(0, editingMember[type]-1)})} className="px-2 bg-gray-200 rounded">-</button>
                  <span>{editingMember[type]}</span>
                  <button onClick={() => setEditingMember({...editingMember, [type]: editingMember[type]+1})} className="px-2 bg-gray-200 rounded">+</button>
                </div>
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <button onClick={() => setIsModalOpen(false)} className="w-full bg-gray-300 py-1 rounded">Cancel</button>
              <button onClick={handleSave} className="w-full bg-orange-500 text-white py-1 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerMealDashboard;