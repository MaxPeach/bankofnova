"use client";
import { baselightTheme } from "../utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import { TransferProvider } from './context/TransferContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          <SessionProvider>
            <TransferProvider> {/* Wrap children with FormProvider */}
              {children}
            </TransferProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
