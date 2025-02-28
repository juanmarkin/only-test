import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import { Bebas_Neue } from 'next/font/google';
import './globals.scss';

const ptSans = PT_Sans({
    weight: ['400', '700'],
    subsets: ['cyrillic'],
    variable: '--font-pt-sans',
});

const bebasNeue = Bebas_Neue({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-bebas-neue',
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
        <html lang='ru'>
            <body className={`${ptSans.variable} ${bebasNeue.variable}`}>{children}</body>
        </html>
    );
}
