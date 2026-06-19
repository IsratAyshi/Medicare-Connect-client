import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen mt-20">
            <DashboardSidebar />
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default DashboardLayout;