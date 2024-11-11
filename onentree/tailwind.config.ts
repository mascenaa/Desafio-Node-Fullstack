import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			feedback: {
				sucess: '#99C766',
				sucess_support: '#2F3B28',
				alert: '#F79E1B',
				alert_support: '#9B671C',
				error: '#FF0000',
				error_support: '#461527'
			},
			surfaces: {
				surface: '#10141D',
				surface_two: '#F7F5F2',
				overlay: '#10141D'
			},

  		},
  		fontSize: {
  			'5xl': '54px',
  			'4xl': '48px',
  			'3xl': '32px',
  			'2xl': '28px',
  			xl: '24px',
  			lg: '20px',
  			md: '16px',
			base: '14px',
  			sm: '12px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
