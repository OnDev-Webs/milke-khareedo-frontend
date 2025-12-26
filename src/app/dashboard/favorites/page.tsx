import DashboardCard from "@/components/dashboard/DashboardCard";

export default function FavoritesPage() {
  return (
    <DashboardCard>
      <h2 className="text-xl font-semibold text-gray-800">
        My Favorite Properties
      </h2>

      <p className="mt-2 text-gray-500">
        Your favorite properties will appear here.
      </p>
    </DashboardCard>
  );
}
