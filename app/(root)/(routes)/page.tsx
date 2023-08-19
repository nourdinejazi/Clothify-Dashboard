import MainNav from "@/components/mainNav";
import Link from "next/link";
const Home = () => {
    return ( 
        <div className="w-full h-full flex flex-col justify-center items-center text-3xl gap-5">
            Welcome to<span className="text-primary mx-2">CLOTHIFY-ADMIN</span>
            <MainNav />
            <div>
            <span className="text-lg  "> admin interface for  : <Link className="underline text-primary" target="_" href={"https://clothify-store.vercel.app/"}>clothify-store.vercel.app</Link> </span>
            </div>
        </div> 
    );
}
 
export default Home;    