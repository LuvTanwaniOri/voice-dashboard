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
				
				// Neural surfaces with AI-inspired depth
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					2: 'hsl(var(--surface-2))',
					glass: 'hsl(var(--surface-glass))'
				},
				
				// Neural borders for glassmorphism
				'border-glass': 'hsl(var(--border-glass))',
				
				// Enhanced text hierarchy
				text: {
					primary: 'hsl(var(--text-primary))',
					secondary: 'hsl(var(--text-secondary))',
					muted: 'hsl(var(--text-muted))', 
					inverse: 'hsl(var(--text-inverse))'
				},
				
				// AI Electric Blue accent system
				'accent-blue': {
					DEFAULT: 'hsl(var(--accent-blue))',
					hover: 'hsl(var(--accent-blue-hover))',
					subtle: 'hsl(var(--accent-blue-subtle))',
					glow: 'hsl(var(--accent-blue-glow))'
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
				'gradient-neural': 'var(--gradient-neural)',
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-success': 'var(--gradient-success)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-glass': 'var(--gradient-glass)',
				'gradient-neural-mesh': 'var(--gradient-neural-mesh)'
			},
			boxShadow: {
				'sm': 'var(--shadow-sm)',
				'md': 'var(--shadow-md)', 
				'lg': 'var(--shadow-lg)',
				'neural': 'var(--shadow-neural)',
				'glow': 'var(--shadow-glow)',
				'glow-subtle': 'var(--shadow-glow-subtle)',
				'card': 'var(--shadow-card)',
				'focus': 'var(--shadow-focus)',
				'neural-pulse': 'var(--shadow-neural-pulse)'
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
				// Neural AI animations
				'neural-pulse': {
					'0%, 100%': { 
						transform: 'scale(1)',
						boxShadow: 'var(--shadow-glow-subtle)'
					},
					'50%': { 
						transform: 'scale(1.02)',
						boxShadow: 'var(--shadow-neural-pulse)'
					}
				},
				'shimmer': {
					'0%': { left: '-100%' },
					'100%': { left: '100%' }
				},
				'neural-wave': {
					'0%, 100%': { transform: 'scaleY(1) scaleX(1)' },
					'25%': { transform: 'scaleY(1.2) scaleX(0.95)' },
					'50%': { transform: 'scaleY(1.4) scaleX(0.9)' },
					'75%': { transform: 'scaleY(1.1) scaleX(0.98)' }
				},
				'ai-breathe': {
					'0%, 100%': { 
						opacity: '0.8',
						transform: 'scale(1)'
					},
					'50%': { 
						opacity: '1',
						transform: 'scale(1.05)'
					}
				},
				'status-sweep': {
					'0%': { left: '-100%' },
					'50%': { left: '100%' },
					'100%': { left: '100%' }
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
				// Neural AI animations
				'neural-pulse': 'neural-pulse 2s infinite ease-in-out',
				'shimmer': 'shimmer var(--duration-slow) infinite',
				'neural-wave': 'neural-wave var(--duration-base) infinite ease-in-out',
				'ai-breathe': 'ai-breathe 3s infinite ease-in-out',
				'status-sweep': 'status-sweep 3s infinite',
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
