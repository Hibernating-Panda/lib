"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Camera, 
  BookOpen, 
  Users, 
  LogOut, 
  User as UserIcon,
  Building,
  Settings,
  RefreshCw,
  Clock,
  Calendar,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminPages() {
    const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, "0");
      setCurrentTime(`${displayHours}:${displayMinutes} ${ampm}`);

      const day = now.getDate();
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      setCurrentDate(`${month} ${day.toString().padStart(2, "0")}, ${year}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Pie chart data - borrowed vs returned
  const totalBorrowed = 1200;
  const totalReturned = 300;
  const total = totalBorrowed + totalReturned;
  const borrowedPercentage = (totalBorrowed / total) * 100;
  const returnedPercentage = (totalReturned / total) * 100;

  // Calculate pie chart segments
  const radius = 80;
  
  // Calculate angles for SVG path
  const borrowedAngle = (borrowedPercentage / 100) * 360;
  const returnedAngle = (returnedPercentage / 100) * 360;
  
  // Helper function to create SVG arc path
  const createArc = (startAngle: number, endAngle: number, radius: number) => {
    const start = (startAngle - 90) * (Math.PI / 180);
    const end = (endAngle - 90) * (Math.PI / 180);
    const x1 = 100 + radius * Math.cos(start);
    const y1 = 100 + radius * Math.sin(start);
    const x2 = 100 + radius * Math.cos(end);
    const y2 = 100 + radius * Math.sin(end);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M 100 100 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };
  
  const borrowedPath = createArc(0, borrowedAngle, radius);
  const returnedPath = createArc(borrowedAngle, borrowedAngle + returnedAngle, radius);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar - Fixed */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white flex flex-col z-50">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">BookWorm</h1>
              <p className="text-xs text-gray-400">LIBRARY</p>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">Nisal Gunasekara</p>
              <p className="text-sm text-gray-400">Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/admin" 
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    pathname === "/admin" 
                      ? "bg-gray-800 text-white" 
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/catalog" 
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    pathname === "/admin/catalog" 
                      ? "bg-gray-800 text-white" 
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                <Camera className="w-5 h-5" />
                <span>Catalog</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/books" 
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    pathname === "/admin/books" 
                      ? "bg-gray-800 text-white" 
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>Books</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/users" 
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    pathname === "/admin/users" 
                      ? "bg-gray-800 text-white" 
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <Users className="w-5 h-5" />
                <span>Users</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Log Out */}
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      {/* Main Content - with left margin for sidebar */}
      <div className="ml-64 ">
        {/* Header - Sticky */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Clock className="w-5 h-5" />
              <span className="text-sm">{currentTime}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">{currentDate}</span>
            </div>
            <button 
                onClick={()=>setIsModalOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content Area - Scrollable */}
        <div className="p-8 bg-gray-100 min-h-[calc(100vh-73px)]">
          {/* Metrics Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Total User Base</p>
                  <p className="text-3xl font-bold text-gray-800">0150</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Total Book Count</p>
                  <p className="text-3xl font-bold text-gray-800">01500</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Branch Count</p>
                  <p className="text-3xl font-bold text-gray-800">0010</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Lists */}
          <div className="grid grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Book Status</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
                    {/* Borrowed Books - Dark Gray */}
                    <path
                      d={borrowedPath}
                      fill="#374151"
                    />
                    {/* Returned Books - Light Gray */}
                    <path
                      d={returnedPath}
                      fill="#9ca3af"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center transform rotate-90">
                      <p className="text-2xl font-bold text-gray-800">{total}</p>
                      <p className="text-sm text-gray-500">Total</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                  <span className="text-sm text-gray-600">Total Borrowed Books</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                  <span className="text-sm text-gray-600">Total Returned Books</span>
                </div>
              </div>
            </div>

            {/* Overdue Borrowers */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Overdue Borrowers</h3>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {[
                  { name: "Sasmith Gunasekara", id: 10 },
                  { name: "John Doe", id: 11 },
                  { name: "Jane Smith", id: 12 },
                  { name: "Mike Johnson", id: 13 },
                  { name: "Sarah Williams", id: 14 },
                ].map((borrower, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{borrower.name}</p>
                        <p className="text-xs text-gray-500">Borrowed ID: {borrower.id}</p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                      <RefreshCw className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* BookWorm Admins */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">BookWorm Admins</h3>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Nisal Gunasekara", id: 1, status: "Active" },
                  { name: "Admin User 2", id: 2, status: "Active" },
                  { name: "Admin User 3", id: 3, status: "Active" },
                  { name: "Admin User 4", id: 4, status: "Active" },
                ].map((admin, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{admin.name}</p>
                        <p className="text-xs text-gray-500">Admin ID: {admin.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-gray-600">{admin.status}</span>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors ml-2">
                        <RefreshCw className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Branch Network */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Branch Network</h3>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {[
                  { name: "BookWorm - Matara", id: 1 },
                  { name: "BookWorm - Colombo", id: 2 },
                  { name: "BookWorm - Kandy", id: 3 },
                  { name: "BookWorm - Galle", id: 4 },
                  { name: "BookWorm - Jaffna", id: 5 },
                  { name: "BookWorm - Kurunegala", id: 6 },
                ].map((branch, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <Building className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{branch.name}</p>
                        <p className="text-xs text-gray-500">Branch ID: {branch.id}</p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                      <RefreshCw className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Change Credentials Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-300 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-gray-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Change Credentials</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-6 space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter Current Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700"
                />
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="border-t border-gray-300 px-6 py-4 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="px-6 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  // Handle password change logic here
                  if (newPassword === confirmPassword && newPassword !== "") {
                    // TODO: Add password change logic
                    console.log("Password changed");
                    setIsModalOpen(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  } else {
                    alert("Passwords do not match or are empty");
                  }
                }}
                className="px-6 py-2 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
