
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
				// Custom colors updated to red/yellow/white theme
				'electric-magenta': '#FF0000', // Changed to red
				'old-gold': '#FFD700',
				'deep-indigo': '#4B0082',
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
				'glowing': {
					'0%': { 
						textShadow: '0 0 5px #FF0000, 0 0 10px #FF0000, 0 0 15px #FF0000' 
					},
					'50%': { 
						textShadow: '0 0 10px #FF0000, 0 0 20px #FF0000, 0 0 30px #FF0000' 
					},
					'100%': { 
						textShadow: '0 0 5px #FF0000, 0 0 10px #FF0000, 0 0 15px #FF0000' 
					}
				},
				'pulse-eye': {
					'0%': { opacity: '0.7' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0.7' }
				},
				'float': {
					'0%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(0px)' }
				},
				'scanline': {
					'0%': { backgroundPosition: '0 0' },
					'100%': { backgroundPosition: '0 100%' }
				},
				'mercury-flow': {
					'0%': { transform: 'rotate(0deg) scale(1)' },
					'50%': { transform: 'rotate(180deg) scale(1.05)' },
					'100%': { transform: 'rotate(360deg) scale(1)' }
				},
				'counter-increase': {
					'0%': { content: '"0"' },
					'10%': { content: '"10+"' },
					'20%': { content: '"20+"' },
					'30%': { content: '"30+"' },
					'40%': { content: '"40+"' },
					'50%': { content: '"50+"' },
					'60%': { content: '"60+"' },
					'70%': { content: '"70+"' },
					'80%': { content: '"80+"' },
					'90%': { content: '"90+"' },
					'100%': { content: '"100+"' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glowing': 'glowing 2s ease-in-out infinite',
				'pulse-eye': 'pulse-eye 1.5s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'scanline': 'scanline 1.5s linear infinite',
				'mercury-flow': 'mercury-flow 15s linear infinite',
				'counter-increase': 'counter-increase 3s linear forwards'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'crt-scanlines': 'linear-gradient(to bottom, rgba(255,0,0,0.1) 1px, transparent 1px, transparent 2px)',
				'circuit-board': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4OCIgaGVpZ2h0PSI4OCIgdmlld0JveD0iMCAwIDg4IDg4Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRjAwMDAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMCAwaDg4djg4SDB6Ii8+PHBhdGggZD0iTTQ2LjIxIDI4Ljc3OHY1LjQyMmgtNS40MjJ6TTQ2LjIxIDUzLjc3OHY1LjQyMmgtNS40MjJ6TTQ2LjIxIDMuNzc4djUuNDIyaC01LjQyMnpNNDYuMjEgNzguNzc4djUuNDIyaC01LjQyMnpNMjguNzc4IDQxLjc5aDUuNDIydjUuNDIyaC01LjQyMnpNNTMuNzc4IDQxLjc5aDUuNDIydjUuNDIyaC01LjQyMnpNMy43NzggNDEuNzloNS40MjJ2NS40MjJIMy43Nzh6TTc4Ljc3OCA0MS43OWg1LjQyMnY1LjQyMmgtNS40MjJ6TTI4Ljc3OCAyOC43NzhoNS40MjJ2NS40MjJoLTUuNDIyek01My43NzggMjguNzc4aDUuNDIydjUuNDIyaC01LjQyMnpNMy43NzggMjguNzc4aDUuNDIydjUuNDIySDMuNzc4ek03OC43NzggMjguNzc4aDUuNDIydjUuNDIyaC01LjQyMnpNMjguNzc4IDUzLjc3OGg1LjQyMnY1LjQyMmgtNS40MjJ6TTUzLjc3OCA1My43NzhoNS40MjJ2NS40MjJoLTUuNDIyek0zLjc3OCA1My43NzhoNS40MjJ2NS40MjJIMy43Nzh6TTc4Ljc3OCA1My43NzhoNS40MjJ2NS40MjJoLTUuNDIyeiIvPjwvZz48L2c+PC9zdmc+')",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
