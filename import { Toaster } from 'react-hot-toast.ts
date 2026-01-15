import { Toaster } from 'react-hot-toast';
// ... imports

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster position="bottom-center" toastOptions={{ style: { background: '#27272A', color: '#fff' } }} />
      </body>
    </html>
  );
}

{
  "buildCommand": "cd frontend && npm run build",
  "installCommand": "cd frontend && npm install",
  "outputDirectory": "frontend/.next"
}