export default function DashboardCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-md">
      {children}
    </div>
  );
}
