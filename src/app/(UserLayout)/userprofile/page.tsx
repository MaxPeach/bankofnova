"use client"; 
import { Grid, Box, Typography, CardContent } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserBalance } from "../../api/user";
import MonthlyEarnings from "../components/overview/MonthlyEarnings";
import DashboardCard from '../components/shared/DashboardCard';
import BlankCard from '../components/shared/BlankCard';
import RecentTransactions from "../components/overview/RecentTransactions";
import PageContainer from '../components/container/PageContainer';

const UserProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter(); // For redirection to login page if not authenticated
  const [chequing, setChequing] = useState<number | null>(null);
  const [savings, setSavings] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login page
    }
    
    if (session) {
      const getBalances = async () => {
        try {
          const balances = await fetchUserBalance(); // Expecting { chequing: 5142, savings: 40321 }
          setChequing(balances.chequing || 0);
          setSavings(balances.savings || 0);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      };
      getBalances();
    }
  }, [session, status, router]); // Including router and status in dependency array

  return (
    <PageContainer title="Overview" description="this is HOME">
      {status === "loading" ? (
        <div>Loading...</div>
      ) : session ? (
        <Box>
            <Grid container spacing={3}>
              {/* Typography Examples for Chequing */}
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h1">Accounts</Typography>
                    {/* <Typography variant="body1" color="textSecondary">
                      Get detailed insights into your chequing account balance and transactions.
                    </Typography> */}
                  </CardContent>
                </BlankCard>
              </Grid>
              </Grid>
          {/* <Grid item xs={12} lg={8}>
            <Typography variant="h6">Chequing Balance: {chequing !== null ? `$${chequing}` : "Loading..."}</Typography>
            <Typography variant="h6">Savings Balance: {savings !== null ? `$${savings}` : "Loading..."}</Typography>
            {error && <Typography style={{ color: "red" }}>{error}</Typography>}
          </Grid> */}
          <Grid item xs={12} lg={8}  sx={{marginBottom: 2}}>
          
          <MonthlyEarnings title="Chequing" balance={chequing ?? 0} link="/accounts/chequing"/>
          </Grid>
          <Grid item xs={12} lg={8}>

          <MonthlyEarnings title="Savings" balance={savings ?? 0} link="/accounts/savings" color="#ff5733" />
          </Grid>
        
          
        </Box>
      ) : (
        <div>You need to be logged in to view this page.</div>
      )}
    </PageContainer>
  );
};

export default UserProfile;
