'use client';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
<DashboardCard title="Success">
  <div>Transfer successful!</div>
</DashboardCard>

    </PageContainer>
  );
};

export default SamplePage;
