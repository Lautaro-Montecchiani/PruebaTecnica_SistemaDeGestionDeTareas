import dynamic from 'next/dynamic';

const ModernDashboard = dynamic(() => import('../src/components/dashboard/ModernDashboard'), { ssr: false });

export default function DashboardPage() {
  return <ModernDashboard />;
}
