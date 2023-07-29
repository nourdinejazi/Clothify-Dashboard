import { UserButton } from "@clerk/nextjs";
import {redirect} from "next/navigation"
import MainNav from "./mainNav";
const Navbar = () => {


    return ( 
    <div className="w-full border-b flex h-16 gap-10 items-center">
        <h1 className="text-3xl p-4 text-accent">Store</h1>
        <div>
            <MainNav />
        </div>
        <div className="p-2 ml-auto">
             <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
     );
}
 
export default Navbar;