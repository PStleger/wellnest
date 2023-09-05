/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: ['group-hover'],
        },
    },
    plugins: [require('tailwindcss-animated')],
    variants: {
        extend: {
          inset: ["group-hover"],
        }
      }
};
