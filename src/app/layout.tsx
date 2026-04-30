import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Impact Tutors | World-Class 1-on-1 Online Tutoring",
  description:
    "Premium 1-on-1 online tutoring for K-12, Adult learners, Languages, Coding, and Music. Expert-led classes for students in the UK, USA, Canada, Australia, Germany, and Malaysia.",
  keywords: [
    "online tutor",
    "1-on-1 tutoring",
    "K-12 education",
    "coding for kids",
    "music lessons online",
    "language learning",
    "adult education",
    "global tutoring",
    "UK",
    "USA",
    "Canada"
  ],
};

import MarketingLayout from "@/components/layout/MarketingLayout";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700&family=Nunito:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <MarketingLayout>{children}</MarketingLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
