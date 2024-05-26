import React from 'react';
import '../styles/global.scss';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </head>
            <body>{children}</body>
        </html>
    );
}
