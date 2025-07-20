import Dashboard from "../../components/dashboard/dashboard";
import { Suspense } from "react";

export default function DashboardPage() {
    return (<>
        <div>
            <h1>Dashboard</h1>

            <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
            </Suspense>
        </div>
    </>);
}