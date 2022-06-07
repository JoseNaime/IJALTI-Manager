module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontFamily:{
            'body': ['Ubuntu', 'sans-serif'],
        },

        colors: {
            'primary': '#4064AC',
            'light-gray': '#f6f6f6',
            'gray': '#E5E5E5',
        },

        container: {
            center: true,
            screens:{
                DEFAULT: "900px"
            }
        }
    },
    plugins: [],
}
