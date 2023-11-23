/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				sunglo: "#e57171",
				orange: "#ff5252",
				whiteText: "#FFFFFF",
				sky: "#6aaefd",
				blue: "#1f89e5",
				darkblue:"#1965A6",
				black: "#000000",
				yellow: "#ddb554",
				yellow2: "#f9c13a",
				gray: "#e2e2e2",
				darkgray: "#999999",
			},
			backgroundImage: {
				"hero-pattern": "url('/img/BackgroundMain.svg')",
				"visitor-pattern": "url('/img/Backgroundform2.svg')",
				"transport-pattern": "url('/img/Backgroundform3.svg')",
			},
		},
	},
	plugins: [require("autoprefixer")],
};
