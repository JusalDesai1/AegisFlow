import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AegisFlow - Emergency Operations Intelligence Platform',
  description: 'AI-Powered Emergency Operations Intelligence Platform for disaster response coordination',
  viewport: 'width=device-width, initial-scale=1',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ff6b4a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-aegis-darker text-aegis-text-primary">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
