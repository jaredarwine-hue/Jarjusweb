/** @type {import('tailwindcss').Config} */
module.exports = {
    blocklist: ["overline"],
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            fontFamily: {
                display: ["'Cormorant Garamond'", "Georgia", "serif"],
                sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
                mono: ["'JetBrains Mono'", "monospace"],
            },
            colors: {
                base: "#F7F5F0",
                surface: "#FFFFFF",
                "surface-alt": "#EFECE3",
                night: "#17261F",
                brand: {
                    DEFAULT: "#1B3B2B",
                    hover: "#26523D",
                },
                gold: {
                    DEFAULT: "#C88A2B",
                    light: "#FDF6E2",
                },
                ink: "#1A231E",
                muted: "#526057",
                edge: "#E2DDD2",
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
                popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
                primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
                secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
                destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
                'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
                marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                marquee: 'marquee 38s linear infinite',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
