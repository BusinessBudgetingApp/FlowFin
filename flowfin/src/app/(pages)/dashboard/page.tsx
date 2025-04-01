"use client";

import Dashboard from "@/components/Dashboard";
import { withAuth } from "@/lib/withAuth";

function DashboardPage() {
    return (
        <>
            <Dashboard />
        </>
    );
}

export default withAuth(DashboardPage);
