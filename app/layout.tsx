import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { TranslationProvider } from '@/contexts/TranslationContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Liza Petkova',
  description: 'Professional and Artistic dual-themed website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LoadingProvider>
            <TranslationProvider defaultLanguage='bg'>
              {children}
            </TranslationProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
