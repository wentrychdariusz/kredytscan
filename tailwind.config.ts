
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				'navy': {
					900: 'hsl(var(--navy-900))'
				},
				'business-blue': {
					50: 'hsl(var(--business-blue-50))'
				},
				'prestige-gold': {
					50: 'hsl(var(--prestige-gold-50))',
					100: 'hsl(var(--prestige-gold-100))',
					200: 'hsl(var(--prestige-gold-200))',
					300: 'hsl(var(--prestige-gold-300))',
					400: 'hsl(var(--prestige-gold-400))',
					500: 'hsl(var(--prestige-gold-500))',
					600: 'hsl(var(--prestige-gold-600))',
					700: 'hsl(var(--prestige-gold-700))'
				},
				'warm-neutral': {
					50: 'hsl(var(--warm-neutral-50))',
					100: 'hsl(var(--warm-neutral-100))',
					200: 'hsl(var(--warm-neutral-200))',
					300: 'hsl(var(--warm-neutral-300))',
					400: 'hsl(var(--warm-neutral-400))',
					600: 'hsl(var(--warm-neutral-600))',
					700: 'hsl(var(--warm-neutral-700))'
				},
				'success-green': {
					50: 'hsl(var(--success-green-50))',
					100: 'hsl(var(--success-green-100))',
					300: 'hsl(var(--success-green-300))',
					400: 'hsl(var(--success-green-400))',
					500: 'hsl(var(--success-green-500))',
					600: 'hsl(var(--success-green-600))',
					700: 'hsl(var(--success-green-700))'
				},
				'alert-red': {
					50: 'hsl(var(--alert-red-50))',
					100: 'hsl(var(--alert-red-100))',
					700: 'hsl(var(--alert-red-700))'
				}
			},
			fontFamily: {
				'playfair': ['Playfair Display', 'serif'],
				'lato': ['Lato', 'sans-serif'],
				'montserrat': ['Montserrat', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'gentle-float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'pulse-subtle': {
					'0%, 100%': {
						transform: 'scale(1)',
						opacity: '1'
					},
					'50%': {
						transform: 'scale(1.02)',
						opacity: '0.95'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'gentle-float': 'gentle-float 3s ease-in-out infinite',
				'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
				'slide-up': 'slide-up 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
