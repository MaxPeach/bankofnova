import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname for current route detection
import {
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";

import { signOut, useSession } from "next-auth/react";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { data: session } = useSession();
  const pathname = usePathname(); // Get the current route
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detect small screens

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/login";
  };

  // Check if the current route is specifically /login or /register
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
<Box>
  <IconButton
    size="large"
    aria-label="profile menu"
    color="inherit"
    aria-controls="msgs-menu"
    aria-haspopup="true"
    sx={{
      ...(typeof anchorEl2 === "object" && { color: "primary.main" }),
    }}
    onClick={handleClick2}
  >
    <IconUser
      width={35}
      style={{
        color: isAuthPage ? "#FFFFFF" : "inherit", // White on /login and /register, default elsewhere
      }}
    />
  </IconButton>

      {/* Dropdown menu */}

  {session ? (
    <>
      <Menu
    id="msgs-menu"
    anchorEl={anchorEl2}
    keepMounted
    open={Boolean(anchorEl2)}
    onClose={handleClose2}
    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    transformOrigin={{ horizontal: "right", vertical: "top" }}
    sx={{
      "& .MuiMenu-paper": {
        width: "200px",
      },
    }}
  >
      <MenuItem>
        <ListItemIcon>
          <IconUser width={20} />
        </ListItemIcon>
        <ListItemText>My Profile</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <IconMail width={20} />
        </ListItemIcon>
        <ListItemText>My Account</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <IconListCheck width={20} />
        </ListItemIcon>
        <ListItemText>My Tasks</ListItemText>
      </MenuItem>
      <Box mt={1} py={1} px={2}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleLogout}
          fullWidth
        >
          Logout
        </Button>
      </Box>
      </Menu>

    </>
  ) : (
    <>
             <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "200px",
            },
          }}
        >
          <MenuItem>
            <Button
              component={Link}
              href="/register"
              variant="outlined"
              size="large"
              disableElevation
              sx={{
                width: "100%",
                height: "45px",
                border: "none",
                "&:hover": {
                  opacity: 0.8,
                  border: "none",
                },
              }}
            >
              <Typography variant="h6">Register</Typography>
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              component={Link}
              size="large"
              href="/login"
              variant="outlined"
              disableElevation
              sx={{
                width: "100%",
                height: "45px",
                border: "none",
                "&:hover": {
                  opacity: 0.8,
                  border: "none",
                },
              }}
            >
              <Typography variant="h6">Login</Typography>
            </Button>
          </MenuItem>
        </Menu>
        </>
    )}
{/* </Menu> */}
  </Box>
  );
};

export default Profile;
