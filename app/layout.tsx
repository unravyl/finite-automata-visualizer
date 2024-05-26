import React from 'react';
import '../styles/global.scss';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
            <title>FA Visualizer</title>
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        </html>
    );
}
