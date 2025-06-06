import React, { useState } from "react";
import { Box, Container, Grid, Typography, TextField, Button, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { Logo } from "react-mui-sidebar";

// Styled components
const FooterBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  padding: theme.spacing(8, 0),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
    pointerEvents: "none"
  }
}));

const Quicklinks = styled(Typography)(({ theme }) => ({
  color: "#fff",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    color: theme.palette.primary.light
  }
}));

const NewsletterInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
    "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#fff" }
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" }
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <FooterBox>

<Container
  maxWidth="lg"
  sx={{
    paddingLeft: '0 !important', // Disable padding-left
    paddingRight: '0 !important', // Disable padding-right
    marginLeft: {
      xs: '16px', // 16px margin for mobile devices (default)
      lg: 'auto', // 32px margin for large screens (1200px and above)
    },
    marginRight: {
      xs: '16px', // 16px margin for mobile devices (default)
      lg: 'auto', // 32px margin for large screens (1200px and above)
    },
  }}
>
      <Grid 
        container 
        spacing={{ xs: 4, md: 0 }} // Adds spacing on small screens, none on medium and above
      >
        {/* Bank primary */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" color="#fff" gutterBottom >
            Bank of Nova
          </Typography>
          <Typography variant="h6" pr={4} fontWeight={300} color="rgba(255,255,255,0.7)" sx={{ maxWidth: 300 }}>
            Pioneering the future of Banking
          </Typography>
        </Grid>
    
  
{/* Contact primary */}
<Grid item xs={12} md={6}>
  <Typography variant="h6" color="#fff" gutterBottom>
    About
  </Typography>
  <Typography variant="body2" pr={4} color="rgba(255,255,255,0.7)">
    Halifax, Nova Scotia, Canada
    <br />
    <a
      href="https://github.com/NSCC-ITC-Winter2025-WEBD3031-700-MCa/webd3031-project-bankofnova"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'rgba(255,255,255,0.7)',  textDecoration: 'underline' }}
    >
      GitHub Repository
    </a>
  </Typography>
</Grid>
  
 
     
          </Grid>

        </Container>
            
          {/* Footer Bottom */}
          <Box mt={8} pt={3} borderTop={1} borderColor="rgba(255,255,255,0.1)">
            <Typography variant="body2" color="rgba(255,255,255,0.7)" align="center">
              © {new Date().getFullYear()} Bank Of Nova. All rights reserved.
            </Typography>
          </Box>
      </FooterBox>
    );
    
};

export default Footer;
