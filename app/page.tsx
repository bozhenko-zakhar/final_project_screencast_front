// app/page.tsx
import DashboardPage from '@/components/DashBoardPage/DashboardPage_main/DashboardPage_main';
import LehlehkaLayout from './(private routes)/layout';

export default function Home() {
  return (
    <LehlehkaLayout>
      <DashboardPage />
    </LehlehkaLayout>
  );
  
}
