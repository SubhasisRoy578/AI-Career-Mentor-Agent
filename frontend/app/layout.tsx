import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
export const metadata: Metadata = { title: 'AI Career Mentor Agent', description: 'Premium AI SaaS foundation for career mentorship.' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><Providers>{children}</Providers></body></html>; }
