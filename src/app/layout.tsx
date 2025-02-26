import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import './globals.scss';

const ptSans = PT_Sans({
    weight: ['400', '700'],
    subsets: ['cyrillic'],
});

export const metadata: Metadata = {
    title: 'Test task for Only agency',
    description: 'Slider example',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={ptSans.className}>{children}</body>
        </html>
    );
}
