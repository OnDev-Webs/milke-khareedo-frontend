import DashboardCard from "@/components/dashboard/DashboardCard";

export default function PreferencesPage() {
    return (
        <DashboardCard>
            <h2 className="text-xl font-semibold text-gray-800">
                My Preferences
            </h2>

            <p className="mt-2 text-gray-500">
                Manage your property preferences here.
            </p>
        </DashboardCard>
    );
}

