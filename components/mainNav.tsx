"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import {cn} from "@/lib/utils"

const MainNav = () => {

    const pathname =usePathname()
    const routes = [

        {
            href : `/billboards`,
            label : 'Billboards',
            active : pathname===`/billboards`
        },
        {
            href : `/categories`,
            label : 'Categories',
            active : pathname===`/categories`
        },
        {
            href : `/sizes`,
            label : 'Sizes',
            active : pathname===`/sizes`
        },
        {
            href : `/colors`,
            label : 'Colors',
            active : pathname===`/colors`
        },
        {
            href : `/products`,
            label : 'Products',
            active : pathname===`/products`
        },
        {
            href : `/orders`,
            label : 'Orders',
            active : pathname===`/orders`
        },
    ]

    return ( 
        <nav className="flex items-center space-x-4 lg:space-x-6">
            {routes.map((route)=>(
                <Link
                key={route.href}
                href={route.href}
                className={cn (
                    'text-sm font-medium transition-colors hover:text-accent',
                    route.active ? 'text-accent ' : 'text-muted-foreground'
                )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}
 
export default MainNav;