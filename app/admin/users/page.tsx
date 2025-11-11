"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Camera, 
  BookOpen, 
  Users, 
  LogOut, 
  User as UserIcon,
  Settings,
  Clock,
  Calendar,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export default function UserManagementPage() {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Prabath Jayasuriya", email: "prabathjaylk@gmail.com", username: "prabathjay" },
    { id: 2, name: "John Doe", email: "johndoe@example.com", username: "johndoe" },
    { id: 3, name: "Jane Smith", email: "janesmith@example.com", username: "janesmith" },
    { id: 4, name: "Mike Johnson", email: "mikej@example.com", username: "mikej" },
    { id: 5, name: "Sarah Williams", email: "sarahw@example.com", username: "sarahw" },
    { id: 6, name: "David Brown", email: "davidb@example.com", username: "davidb" },
    { id: 7, name: "Emily Davis", email: "emilyd@example.com", username: "emilyd" },
    { id: 8, name: "Robert Wilson", email: "robertw@example.com", username: "robertw" },
    { id: 9, name: "Lisa Anderson", email: "lisaa@example.com", username: "lisaa" },
    { id: 10, name: "Michael Taylor", email: "michaelt@example.com", username: "michaelt" },
    { id: 11, name: "Jennifer Martinez", email: "jenniferm@example.com", username: "jenniferm" },
    { id: 12, name: "Christopher Lee", email: "christopherl@example.com", username: "christopherl" },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Form state for Add/Edit
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

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

  const filteredUsers = useMemo(() => {
    if (searchQuery.trim() === "") {
      return users;
    } else {
      const query = searchQuery.toLowerCase();
      return users.filter(
        (user) =>
          user.id.toString().includes(query) ||
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query)
      );
    }
  }, [searchQuery, users]);

  const handleAddUser = () => {
    if (formData.name && formData.email && formData.username && formData.password) {
      const newUser: User = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: formData.name,
        email: formData.email,
        username: formData.username,
      };
      setUsers([...users, newUser]);
      setFormData({ name: "", email: "", username: "", password: "" });
      setIsAddModalOpen(false);
    }
  };

  const handleEditUser = () => {
    if (selectedUser && formData.name && formData.email && formData.username) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? { ...user, name: formData.name, email: formData.email, username: formData.username }
            : user
        )
      );
      setFormData({ name: "", email: "", username: "", password: "" });
      setSelectedUser(null);
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setSelectedUser(null);
      setIsDeleteModalOpen(false);
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, username: user.username, password: "" });
    setIsEditModalOpen(true);
  };

  const openViewModal = (user: User) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", username: "", password: "" });
    setSelectedUser(null);
  };

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

      {/* Main Content - with left margin for sidebar */}
      <div className="ml-64">
        {/* Header - Sticky */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Nisal Gunasekara</p>
                <p className="text-sm text-gray-500">Admin</p>
              </div>
            </div>
          </div>
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
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content Area - Scrollable */}
        <div className="p-8 bg-gray-100 min-h-[calc(100vh-73px)]">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

          {/* Action Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between border border-gray-200">
            <button
              onClick={() => {
                resetForm();
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add User</span>
            </button>
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 w-64">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID or Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-gray-700"
              />
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Username</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-800">{user.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{user.username}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openViewModal(user)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(user)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(user)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No users found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setIsAddModalOpen(false);
            resetForm();
          }}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-black px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Add User</h2>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  resetForm();
                }}
                className="w-8 h-8 rounded-lg border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            {/* Form Content */}
            <div className="px-6 py-6 space-y-4">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-600 text-gray-700 placeholder-gray-400"
                />
              </div>
              {/* Email Field */}
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-600 text-gray-700 placeholder-gray-400"
                />
              </div>
              {/* Username and Password Side by Side */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Username"
                    className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-600 text-gray-700 placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-600 text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-300 px-6 py-4 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  resetForm();
                }}
                className="px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleAddUser}
                className="px-6 py-2 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setIsEditModalOpen(false);
            resetForm();
          }}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-black px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Update User</h2>
              </div>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  resetForm();
                }}
                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            {/* Form Content */}
            <div className="px-6 py-6 space-y-4">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-600 text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-600 text-gray-700 placeholder-gray-400"
                />
              </div>
              {/* Username and Password Side by Side */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Username"
                    className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-600 text-gray-700 placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-600 text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300 px-6 py-4 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  resetForm();
                }}
                className="px-6 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleEditUser}
                className="px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
              >
                UPDATE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {isViewModalOpen && selectedUser && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setIsViewModalOpen(false);
            setSelectedUser(null);
          }}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-black px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">View User</h2>
              </div>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedUser(null);
                }}
                 className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            {/* Main Content Card */}
            <div className="p-6">
              <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                <div className="flex">
                  {/* Left Section - User Details */}
                  <div className="flex-1 p-6 space-y-4">
                    <div className="pb-4 border-b border-black">
                      <p className="text-gray-700">
                        <span className="font-medium">User ID : </span>
                        <span>{selectedUser.id}</span>
                      </p>
                    </div>
                    <div className="pb-4 border-b border-black">
                      <p className="text-gray-700">
                        <span className="font-medium">Name : </span>
                        <span>{selectedUser.name}</span>
                      </p>
                    </div>
                    <div className="pb-4 border-b border-black">
                      <p className="text-gray-700">
                        <span className="font-medium">Email : </span>
                        <span>{selectedUser.email}</span>
                      </p>
                    </div>
                    <div className="pb-4 border-b border-black">
                      <p className="text-gray-700">
                        <span className="font-medium">Username : </span>
                        <span>{selectedUser.username}</span>
                      </p>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="w-px bg-gray-300"></div>

                  {/* Right Section - Saved By */}
                  <div className="flex-1 p-6">
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">Saved by :</p>
                      <p className="text-gray-700">Nisal Gunasekara</p>
                      <p className="text-gray-600 text-sm">(Admin)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer - Close Button */}
            <div className="px-6 pb-6 flex justify-center">
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedUser(null);
                }}
                className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors w-full max-w-xs"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => {
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
          }}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-black px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Delete Confirmation</h2>
              </div>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedUser(null);
                }}
                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            {/* Content Section */}
            <div className="px-6 py-8">
              <p className="text-gray-800 text-center leading-relaxed">
                Are you certain you wish to proceed
                <br />
                with the deletion of the selected
                <br />
                entry?
              </p>
            </div>
            
            {/* Action Button */}
            <div className="px-6 pb-6 flex justify-center">
              <button
                onClick={handleDeleteUser}
                className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors w-full"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal (Change Credentials) */}
      {isSettingsModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsSettingsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-gray-300 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-gray-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Change Credentials</h2>
              </div>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            <div className="px-6 py-6 space-y-6">
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
            <div className="border-t border-gray-300 px-6 py-4 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setIsSettingsModalOpen(false);
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
                  if (newPassword === confirmPassword && newPassword !== "") {
                    // TODO: Add password change logic
                    console.log("Password changed");
                    setIsSettingsModalOpen(false);
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
