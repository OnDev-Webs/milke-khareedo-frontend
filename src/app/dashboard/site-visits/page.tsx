import DashboardCard from "@/components/dashboard/DashboardCard";

export default function SiteVisitsPage() {
  return (
    <DashboardCard>
      <h2 className="text-xl font-semibold text-gray-800">Site Visits</h2>

      <p className="mt-2 text-gray-500">
        Your scheduled site visits will appear here.
      </p>
    </DashboardCard>
  );
}
