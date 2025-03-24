'use client';
import { Typography, Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ProductPerformance2 from "../../components/overview/TransactionTable";

const Transaction = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
        <Grid>
              <ProductPerformance2 />
            </Grid>
    </PageContainer>
  );
};

export default Transaction;

