import cn from '@/utils/clsxFun';
import { ReactNode } from 'react'
import Loader from './Loader';


interface ButtonElementType {
  type?: "submit" | "button" | "reset" | undefined;
  size?: "sm" | "md" | "lg";
  variant?: "text" | "outlined" | "contained";
  typeButton: "primary" | "secondary" | "gray" | "error" | "transparent" | "gray-light" | "link" | undefined
  disabled?: boolean;
  handler?: () => void;
  fontSize?: "sm" | "md" | "lg";
  fontWeight?: "normal" | "bold" | "fat";
  width?: string;
  children?: ReactNode;
  hover?: string;
  animation?: string;
  customStyle?: string,
  loading?: boolean
}


const ButtonElement = ({ loading = false, disabled, customStyle, handler, hover, size = "sm", variant = "contained", type = "button", animation, width = "w-full", children, fontSize = "md", fontWeight = "normal", typeButton }: ButtonElementType) => {
  return (
    <button type={type} disabled={loading || disabled} onClick={handler} className={cn(`px-4 transition-all duration-300 flex justify-center items-center gap-2`,
      hover,
      width,
      {
        "cursor-default": disabled,
        "no-animation": !animation,
        "min-h-[2.5rem]": size === "sm",
        "min-h-[3rem]": size === "md",
        "min-h-[4rem]": size === "lg",
        "text-sm": fontSize === "sm",
        "text-md": fontSize === "md",
        "text-lg": fontSize === "lg",
        "font-normal": fontWeight === "normal",
        "font-bold": fontWeight === "bold",
        "font-[900]": fontWeight === "fat",
        "bg-error-dark text-white rounded-full hover:bg-white hover:border hover:border-error hover:text-error-dark": typeButton === "error" && variant === "contained",

        "bg-transparent text-primary border border-primary rounded-full hover:bg-primary hover:text-white": typeButton === "transparent" && variant === "contained",

        "bg-primary text-white rounded-full  hover:bg-white hover:text-primary hover:border hover:border-primary hover:font-bold": typeButton === "primary" && variant === "contained",
        "bg-link text-white rounded-full  hover:bg-white hover:text-link hover:border hover:border-link hover:font-bold": typeButton === "link" && variant === "contained",

        "bg-gray-200 text-white rounded-full  hover:bg-white hover:text-primary hover:border hover:border-primary hover:font-bold": typeButton === "gray-light" && variant === "contained",

        "bg-primary-light text-white rounded-full hover:bg-white hover:text-primary": typeButton === "gray" && variant === "contained",
        "bg-white text-primary rounded-full hover:bg-primary hover:text-white": typeButton === "secondary" && variant === "contained",
        "bg-transparent border border-primary rounded-full hover:bg-primary hover:text-white": typeButton === "secondary" && variant === "outlined",
        "bg-transparent border border-white rounded-full hover:bg-white hover:text-primary": typeButton === "secondary" && variant === "outlined",
        "bg-transparent border border-primary-light rounded-full hover:bg-primary-light hover:text-white": typeButton === "gray" && variant === "outlined",
      },
      customStyle,
    )}>
      {loading ? <Loader size='size-[2.25rem]' color={typeButton === "primary" ? "border-white" : "border-primary"} /> : children}
    </button >
  )
}

export default ButtonElement