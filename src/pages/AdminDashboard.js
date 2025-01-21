import React from 'react'
import AdminSidebar from './AdminSidebar'

export default function AdminDashboard() {
  return (
    <div>
      <AdminSidebar />
      <div className="dashboard-container">
      <div className="main-content">

        <div className="text-center space-y-5">
          <h1 className="text-5xl font-bold">Welcome to Admin DashBoard</h1>
        </div>

      </div>
    </div>
    </div>
  )
}
