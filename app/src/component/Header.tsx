"use client";

import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    // Add logout logic here
    // For now, just close the menu
    setShowUserMenu(false);
    // You can add actual logout functionality like:
    // - Clear authentication tokens
    // - Redirect to login page
    // - etc.
  };

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
      <div className="flex-1">
        {/* Can add breadcrumbs or page title here */}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-medium">
              U
            </div>
          </button>
          
          {showUserMenu && (
            <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">User</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

