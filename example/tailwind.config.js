/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				in: 'fadeIn 0.5s ease-in-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0, scale: '90%' },
					'100%': { opacity: 1, scale: '100%' },
				},
			},
		},
	},
	plugins: [require('daisyui')],
};
