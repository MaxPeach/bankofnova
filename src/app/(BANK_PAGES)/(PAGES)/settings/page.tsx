'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

interface Contact {
  id: number;
  nickname: string;
  email: string;
}

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/user/listContacts');
        const data = await response.json();

        if (data.success) {
          setContacts(data.contacts);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, contactId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedContactId(contactId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (selectedContactId !== null) {
      console.log('Edit contact with ID:', selectedContactId);
      // TODO: Redirect or open modal for editing
    }
    handleMenuClose();
  };

  const handleRemove = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedContactId(null);
  };

  const confirmDelete = async () => {
    if (selectedContactId !== null) {
      try {
        const response = await fetch('/api/user/deleteContact', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contactId: selectedContactId }),
        });

        const data = await response.json();

        if (data.success) {
          // Refresh contacts after successful delete
          setContacts(prev => prev.filter(contact => contact.id !== selectedContactId));
          console.log('Contact removed successfully');
        } else {
          console.error(data.message);
          alert(data.message);
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Error deleting contact.');
      }
    }
    handleDialogClose();
  };

  return (
    <PageContainer title="My Contacts" description="List of saved contacts">
      <DashboardCard elevation={0} title="My Contacts">
        <>
          {/* Transfer to Contact button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => {
              window.location.href = '/transactions/transfer/contact?redirect=/settings';
            }}
            
          >
            Add Contact
          </Button>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="150px">
              <CircularProgress />
            </Box>
          ) : contacts.length === 0 ? (
            <Typography>No contacts found.</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Contact name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    {/* Contact Name with Avatar */}
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, fontSize: 14, mr: 2 }}>
                          {(contact.nickname?.charAt(0).toUpperCase() || contact.email.charAt(0).toUpperCase())}
                        </Avatar>
                        <Typography variant="body1" fontWeight="500">
                          {contact.nickname}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Email */}
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {contact.email}
                      </Typography>
                    </TableCell>

                    {/* More Options */}
                    <TableCell align="right">
                      <IconButton onClick={(event) => handleMenuOpen(event, contact.id)}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Action Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleRemove}>Remove</MenuItem>
          </Menu>

          {/* Confirmation Dialog */}
          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Remove Contact</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to remove this contact? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDelete} color="error" variant="contained">
                Remove
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default ContactsPage;
