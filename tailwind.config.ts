import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'custom-blue': '#6CA0DC',
                'custom-gray': '#C5C6D0',
                'custom-red': '#BC544D',
                'custom-green': '#99EDC3',
              },
        },
    },
    plugins: [],
};

export default config;
