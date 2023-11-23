/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: ["group-hover"],
        },
    },
    plugins: [require("tailwindcss-animated")],
    variants: {
        extend: {
            inset: ["group-hover"],
        },
    },
};

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};

module.exports = {
    plugins: [require("flowbite/plugin")],
};

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}" /* src folder, for example */],
    theme: {
        extend: {},
    },
    plugins: [require("tailwindcss-animated")],
};
