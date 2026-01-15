import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import ErrorBoundary from '../components/ErrorBoundary';
import { ClientThemeProvider } from '../components/ClientThemeProvider';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EZONGA | Boyé Malamu",
  description: "Tokokota na mboka na biso moko",
  manifest: "/manifest.json",
  themeColor: "#ec4899",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EZONGA",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ec4899',
};

// Register service worker
if (typeof window !== 'undefined') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="EZONGA" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ClientThemeProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ClientThemeProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#27272A',
              color: '#fff'
            }
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
