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
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'mono': ['JetBrains Mono', 'monospace'],
			},
			fontSize: {
				'xs': 'var(--text-xs)',
				'sm': 'var(--text-sm)', 
				'md': 'var(--text-md)',
				'lg': 'var(--text-lg)',
				'xl': 'var(--text-xl)',
				'2xl': 'var(--text-2xl)',
				'3xl': 'var(--text-3xl)',
				'4xl': 'var(--text-4xl)',
			},
			lineHeight: {
				'tight': 'var(--line-tight)',
				'normal': 'var(--line-normal)',
				'relaxed': 'var(--line-relaxed)',
			},
			spacing: {
				'xs': 'var(--space-xs)',
				'sm': 'var(--space-sm)',
				'md': 'var(--space-md)',
				'lg': 'var(--space-lg)',
				'xl': 'var(--space-xl)',
				'2xl': 'var(--space-2xl)',
				'3xl': 'var(--space-3xl)',
				'4xl': 'var(--space-4xl)',
				'5xl': 'var(--space-5xl)',
				'6xl': 'var(--space-6xl)',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				// Enhanced color system
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					2: 'hsl(var(--surface-2))'
				},
				text: {
					primary: 'hsl(var(--text-primary))',
					secondary: 'hsl(var(--text-secondary))',
					muted: 'hsl(var(--text-muted))',
					inverse: 'hsl(var(--text-inverse))'
				},
				
				// Single Accent System
				'accent-primary': {
					DEFAULT: 'hsl(var(--accent-primary))',
					hover: 'hsl(var(--accent-primary-hover))',
					light: 'hsl(var(--accent-primary-light))',
					muted: 'hsl(var(--accent-primary-muted))'
				},
				
				// Legacy compatibility
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
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
				
				// State colors
				success: {
					DEFAULT: 'hsl(var(--success))',
					subtle: 'hsl(var(--success-subtle))',
					foreground: 'hsl(var(--text-inverse))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					subtle: 'hsl(var(--warning-subtle))',
					foreground: 'hsl(var(--text-inverse))'
				},
				danger: {
					DEFAULT: 'hsl(var(--danger))',
					subtle: 'hsl(var(--danger-subtle))',
					foreground: 'hsl(var(--text-inverse))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--text-inverse))'
				},
				
				// Audio quality
				'audio-good': 'hsl(var(--audio-good))',
				'audio-fair': 'hsl(var(--audio-fair))',
				'audio-poor': 'hsl(var(--audio-poor))',
				
				// Sidebar
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-success': 'var(--gradient-success)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-glass': 'var(--gradient-glass)'
			},
			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)', 
				'lg': 'var(--shadow-lg)',
				'glow': 'var(--shadow-glow)',
				'card': 'var(--shadow-card)',
				'focus': 'var(--shadow-focus)'
			},
			transitionDuration: {
				'fast': 'var(--duration-fast)',
				'base': 'var(--duration-base)',
				'slow': 'var(--duration-slow)',
				'deliberate': 'var(--duration-deliberate)'
			},
			transitionTimingFunction: {
				'in': 'var(--easing-in)',
				'out': 'var(--easing-out)',
				'in-out': 'var(--easing-in-out)'
			},
			borderRadius: {
				'sm': 'var(--radius-sm)',
				'md': 'var(--radius-md)',
				'lg': 'var(--radius-lg)',
				'xl': 'var(--radius-xl)',
				'2xl': 'var(--radius-2xl)'
			},
			keyframes: {
				// Voice-specific animations
				'shimmer': {
					'0%': { left: '-100%' },
					'100%': { left: '100%' }
				},
				'waveform': {
					'0%, 100%': { transform: 'scaleY(1)' },
					'50%': { transform: 'scaleY(1.3)' }
				},
				'listening-pulse': {
					'0%, 100%': { transform: 'scale(1)', opacity: '1' },
					'50%': { transform: 'scale(1.05)', opacity: '0.8' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(8px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				// Legacy animations
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				// Voice animations
				'shimmer': 'shimmer var(--duration-slow) infinite',
				'waveform': 'waveform var(--duration-base) infinite ease-in-out',
				'listening-pulse': 'listening-pulse 2s infinite',
				'fade-in': 'fade-in var(--duration-base) var(--easing-out)',
				'scale-in': 'scale-in var(--duration-fast) var(--easing-out)',
				// Legacy animations
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
