import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xsOne: "480px",
        mdSecondary: "920px",
      },
      backgroundImage: {
        white_to_transparent:
          "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 80%)",
      },
      container: {
        center: true,
      },
      colors: {
        primary: {
          100: "#52FF6E",
          light: "#C7F6F578",
          DEFAULT: "#008582",
        },
        error: {
          light: "#FFEFEF",
          100: "#FB6C6C",
          DEFAULT: "#E0342A",
          dark: "#CE1B1B",
        },
        black: "#000",
        gray: {
          100: "#EFF1F0",
          200: "#E6E9E8",
          300: "#D1D1D1",
          400: "#C4C7C6",
          450: "#C9C5CA",
          DEFAULT: "#C5C5C5",
          500: "#8E9190",
          550: "#EBEBEB",
          600: "#444747",
          650: "#f2f2f2",
          700: "#f8f8f8",
          800: "#79767A",
        },
        bg_content: "#EFF1F0",
        star_on: "#F6BE1F",
        link: {
          light: "#EFF4FF",
          DEFAULT: "#235FA6",
        },
        green: {
          300: "#6DBEB9",
        },
      },
      fontSize: {
        xs: "0.625rem",
        sm: "0.75rem",
        md: "0.875rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      borderRadius: {
        ss: "0.3125rem",
        xs: "0.5rem",
        sm: "0.625rem",
        md: "1.125rem",
        lg: "1.25rem",
        xl: "2.1875rem",
      },
      fontWeight: {
        100: "100",
        200: "200",
        300: "300",
        normal: "400",
        500: "500",
        600: "600",
        bold: "700",
        800: "800",
        900: "900",
      },
      boxShadow: {
        shadow_toast: "0px 4px 6px 0px rgba(0, 0, 0, 0.15)",
        shadow_category: "0px 1px 8px 0px rgba(0, 0, 0, 0.05)",
        shadow_bottom_nav:
          "0.625rem 0.625rem 1.875rem 0.625rem rgba(0,0,0,0.1)",
        shadow_comment: "-12px 9px 19px -12px rgba(0, 0, 0, 0.25)",
        shadow_blog: "0px 2px 58px -13px rgba(0, 0, 0, 0.30)",
        no_appointment_timer: "0px 0px 19px -4px rgba(0, 0, 0, 0.42)",
        hover: "0px 0px 15px 0px #B4C7C6",
      },
      keyframes: {
        modal_search: {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0.7",
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: "1",
          },
        },
        opacity: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        bouncing: {
          "0%": {
            transform: "scale(1)",
          },
          "25%": {
            transform: "scale(1.15)",
          },
          "50%": {
            transform: "scale(0.9)",
          },
          "75%": {
            transform: "scale(1.05)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        opacity_60: {
          "0%": {
            opacity: "0.6",
          },
          "100%": {
            opacity: "1",
          },
        },
        like_thumb: {
          "0%": {
            transform: "rotate(0)",
            bottom: "0",
          },
          "15%": {
            transform: "rotate(15deg)",
            bottom: "3px",
            right: "2px",
          },
          "60%": {
            transform: "rotate(-25deg)",
            bottom: "9px",
            right: "6px",
          },
          "70%": {
            transform: "rotate(-15deg)",
            bottom: "5px",
            right: "3px",
          },
          "80%": {
            transform: "rotate(20deg)",
            bottom: "-3px",
            right: "0",
          },
          "100%": {
            transform: "rotate(0)",
            bottom: "0",
            right: "0",
          },
        },
        search_content: {
          "0%": {
            height: "0",
          },
          "100%": {
            height: "25rem",
          },
        },
      },
      animation: {
        modal_search: "modal_search 500ms ease-out both",
        opacity: "opacity 1000ms ease-out both",
        opacity_60: "opacity_60 500ms ease-out both",
        bouncing: "bouncing 300ms ease",
        like_thumb: "like_thumb 500ms ease",
        search_content: "search_content 500ms ease",
      },
    },
  },
};
export default config;
