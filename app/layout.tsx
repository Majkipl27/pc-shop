import { Toaster } from "@components/ui/toaster";
import { Metadata } from "next";
import { ThemeProvider } from "@components/theme-provider";
import "./global.css";
import Header from "@components/header";

export const metadata: Metadata = {
  title: "Pc-shop",
  description: "Welcome to pc-shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
