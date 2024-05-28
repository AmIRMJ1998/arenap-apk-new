import cn from "@/utils/clsxFun";

import Link from "next/link"
import { ReactNode } from "react"

export interface LinkElementCom {
    children: ReactNode;
    link: string;
    prefetch?: boolean;
    className?: string
}

const LinkElement = ({ children, link, prefetch, className }: LinkElementCom) => {
    

    return (
        <Link href={`/${link}`}  prefetch={prefetch} className={cn(className)}>
            {children}
        </Link>
    )
}

export default LinkElement