import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AegisFlow - AI-Powered Disaster Intelligence',
  description: 'National emergency operations platform for coordinating disaster response across agencies',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-aegis-darker text-aegis-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
