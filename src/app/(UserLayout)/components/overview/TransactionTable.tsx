import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card
} from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchTransactions } from '../../../api/user'; // Replace with your actual fetch function

interface ProductPerformanceProps {
  accountType: 'chequing' | 'savings';
}

const TransactionTable = ({ accountType }: ProductPerformanceProps) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetchTransactions(accountType); // Fetch transactions for the given account type
        setTransactions(response);
      } catch (error) {
        setError('Failed to fetch transactions.');
      }
    };

    getTransactions();
  }, [accountType]);

  return (
    <Card elevation={0} title={`${accountType.charAt(0).toUpperCase() + accountType.slice(1)} Transaction History`}>
      <Box sx={{ overflow: 'auto' }}>
        <Table aria-label="transaction table" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Account Type
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Amount
                </Typography>
              </TableCell>
              {/* New Balance Column */}
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Balance
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography align="center" color="textSecondary">
                    No transactions available.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {transaction.transaction_type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="h6"
                      sx={{
                        color: transaction.direction === 'sent' ? 'error.main' : 'success.main',
                      }}
                    >
                      {transaction.direction === 'sent' ? '-' : '+'}${transaction.amount}
                    </Typography>
                  </TableCell>
                  {/* New Balance Column */}
                  <TableCell align="right">
                    <Typography variant="h6" fontWeight={400}>
                      ${transaction.balance}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default TransactionTable;
