import type { Metadata } from 'next';
import ShaderBackground from '@/components/ShaderBackground';
import FollowCursor from '@/components/FollowCursor';
import './globals.css';

export const metadata: Metadata = {
  title: 'Emma da Silva',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ShaderBackground />
        <FollowCursor />
        {children}
      </body>
    </html>
  );
}
