import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '../components/ErrorBoundary';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EZONGA | Boyé Malamu",
  description: "Tokokota na mboka na biso moko"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#27272A',
              color: '#fff'
            }
          }}
        />
      </body>
    </html>
  );
}
