import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeContext';

export const metadata: Metadata = {
  title: 'FLOW — AI Productivity Companion',
  description: 'FLOW turns scattered commitments into an adaptive plan and answers: What should I do right now?',
  keywords: ['productivity', 'AI companion', 'task management', 'adaptive planning', 'focus mode', 'time management'],
  authors: [{ name: 'FLOW Team' }],
  openGraph: {
    title: 'FLOW — Focus, Logic, Orchestration & Workflow',
    description: 'An AI productivity companion that turns scattered commitments into an adaptive plan.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F2F3F5' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0E10' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-flow-accent/20 selection:text-flow-accent">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
