import { Box, Button, Link, Typography, IconButton, Tooltip } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import LogoutIcon from '@mui/icons-material/Logout'; // Material UI Logout Icon

export const SidebarProfile = () => {
  const { data: session } = useSession(); // Get the session data
  const userName = session?.user?.name || "Guest"; // Default to "Guest" if not logged in

  return (
    <Box display="flex" alignItems="center" gap={2} sx={{p: 2, marginBottom: -8, mt: 10 }}>
      <Box>
        {session ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h5" fontSize="16px">
              {userName}
            </Typography>
            <Tooltip title="Sign out" arrow>
              <IconButton
                color="primary"
                aria-label="logout"
                onClick={() => signOut()}
                size="small"
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <>
            <Typography variant="h5" fontSize="16px" mb={1}>
              Haven't an account?
            </Typography>
            <Button
              color="primary"
              target="_blank"
              disableElevation
              component={Link}
              href="/register"
              variant="contained"
              aria-label="signup"
              size="small"
            >
              Sign Up
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};
