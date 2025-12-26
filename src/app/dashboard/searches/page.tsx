import DashboardCard from "@/components/dashboard/DashboardCard";

export default function SearchesPage() {
  return (
    <DashboardCard>
      <h2 className="text-xl font-semibold text-gray-800">My Searches</h2>

      <p className="mt-2 text-gray-500">
        Your saved searches will appear here.
      </p>
    </DashboardCard>
  );
}
