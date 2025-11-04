"use client";

import { Search, Clock, Calendar, ChevronDown, User } from "lucide-react";
import { useState, useEffect } from "react";
// import Image from "next/image";

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Format time: 09:00 AM
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, "0");
      setCurrentTime(`${displayHours}:${displayMinutes} ${ampm}`);
      
      // Format date: 4-MAR-2023
      const day = now.getDate();
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      setCurrentDate(`${day}-${month}-${year}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 w-full px-6 py-4 flex items-center justify-between rounded-lg shadow-sm">
      {/* Left: Search Component */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* All Dropdown Button */}
          <button className="px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-1 border-r border-gray-200">
            All
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {/* Search Input */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 outline-none text-gray-700 w-64"
            />
            <button className="px-4 py-2 text-red-500 hover:bg-gray-50">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Date/Time and User Profile */}
      <div className="flex items-center gap-4">
        {/* Date and Time Display */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2 flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium">{currentTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium">{currentDate}</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <span className="text-gray-700 font-medium">Kenson</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
}