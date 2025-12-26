import DashboardCard from "@/components/dashboard/DashboardCard";

export default function DashboardHomePage() {
  return (
    <DashboardCard>
      <h2 className="text-xl font-semibold text-gray-800">
        Welcome to your Dashboard
      </h2>

      <p className="mt-2 text-gray-500">
        Use the options above to manage your profile, favorites, searches, and
        preferences.
      </p>
    </DashboardCard>
  );
}
