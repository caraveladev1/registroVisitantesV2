/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				sunglo: "#E0B2BA",
				orange: "#DA8257",
				beigeText: "#DFDCCA",
				beige: "#DFDCCA",
				sky: "#6aaefd",
				blue: "#B1D5CE",
				darkblue: "#95D9CC",
				black: "#000000",
				green: "#B9BA82",
				green2: "#A7A870",
				gray: "#e2e2e2",
				darkgray: "#999999",
				brown: "#482E20",
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
