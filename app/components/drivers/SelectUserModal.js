"use client";

import { useState } from "react";
import { X, Search } from "lucide-react";

const SelectUserModal = ({ isOpen, onClose, onSelect, isLoading = false }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    setSearching(true);
    try {
      const res = await fetch(
        `/api/drivers/select-user?search=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setSearching(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface-container border border-white/10 rounded-2xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Select User as Driver</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="max-h-96 overflow-y-auto mb-4">
          {searching ? (
            <p className="text-center text-gray-400 py-4">Searching...</p>
          ) : users.length === 0 ? (
            <p className="text-center text-gray-400 py-4">
              {search ? "No users found" : "Type to search for users"}
            </p>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <button
                  key={user._id}
                  onClick={() => onSelect(user)}
                  className="w-full text-left p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectUserModal;
