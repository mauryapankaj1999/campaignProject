"use client";

import DashboardLayout from "@/app/src/component/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-gray-500">Settings content coming soon...</p>
      </div>
    </DashboardLayout>
  );
}

