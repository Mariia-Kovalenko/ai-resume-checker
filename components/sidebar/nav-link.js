'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./main-sidebar.module.css";
import React from "react";

export default function NavLink({href, children, collapsed, onClick}) {
    const path = usePathname();
    const isActive = href === '/' ? path === '/' : path.startsWith(href);
    const colorClass = isActive ? 'text-[var(--color-purple)]' : 'text-[var(--color-black)]';
    return (
        <Link href={href} onClick={onClick} className={`${colorClass} h-[40px] relative flex items-center gap-3 py-2 px-2 rounded transition-colors duration-200 hover:bg-[var(--color-light-purple)] font-medium`}>{
            React.Children.map(children, (child, idx) => {
                if (typeof child === 'string' && collapsed) return null;
                return child;
            })
        }</Link>
    );
}