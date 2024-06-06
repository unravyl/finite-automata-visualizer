'use client';

import React, { useEffect, useState } from 'react';
import '../styles/global.scss';
import { usePathname } from 'next/navigation';
import SplashScreen from '../components/SplashScreen';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [isLoading, setIsLoading] = useState(isHome);

    useEffect(() => {
        if (isLoading) return;
    }, [isLoading]);

    return (
        <html lang="en">
            <head>
                <title>FA Visualizer</title>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    name="description"
                    content="FA Visualizer is an application for visualizing finite automata."
                />
                <meta
                    name="keywords"
                    content="FA Visualizer, finite automata, automata theory, DFA, NFA"
                />
                <meta name="author" content="Super Nigga" />
                <meta name="og:image" content="/images/metapic.png" />
                <meta
                    name="og:title"
                    content="FA Visualizer - an application for visualizing finite automata"
                />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link
                    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                    rel="stylesheet"
                ></link>
            </head>
            <body className='overflow-hidden'>
                {isLoading && isHome ? (
                    <SplashScreen finishLoading={() => setIsLoading(false)} />
                ) : (
                    <>{children}</>
                )}
            </body>
        </html>
    );
}
