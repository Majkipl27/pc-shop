import { ModeToggle } from "@components/mode-toggle";
import { Toaster } from "@components/ui/toaster";
import { Metadata } from "next";
import { ThemeProvider } from "@components/theme-provider";
import "./global.css";

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
          <ModeToggle />
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
