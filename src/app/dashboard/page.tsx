import DashboardCard from "@/components/dashboard/DashboardCard";

export default function DashboardHomePage() {
  return (
<DashboardCard className="min-h-40 sm:min-h-54 flex flex-col ">
      <h2 className="text-xl font-semibold text-gray-800">
        Welcome to your Dashboard
      </h2>

      <p className="mt-2 text-gray-500">
        Use the options above to manage your profile, favorites,
        searches, and preferences.
      </p>
    </DashboardCard>
  );
}
