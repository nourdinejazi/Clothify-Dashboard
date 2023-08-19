"use client"

import Heading from "@/components/heading";
import { CategoryColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {toast} from "react-hot-toast"

const notify = () => toast('Here is your toast.');
notify()

interface CategoriesClientProps  {

    data : CategoryColumn []
}

const CategoriesClient : React.FC<CategoriesClientProps> = ({
    data
}) => {

    const router=useRouter()


    return ( 
        <>
            <div className="flex items-center justify-center">
                <Heading title={`Categories(${data.length})`}  description="Manager Categories for your store" />
                <Button
                    className="ml-auto  focus:ring "
                    onClick={()=>
                        router.push("/categories/new")
                    }
                >
                <Plus className="mr-2 h-4 w-4" />  Add New
                </Button>
            </div>
            <Separator className=" mb-8 bg-primary" />
                <DataTable searchKey="name" columns={columns}  data={data} />
        </> 
    );
}
 
export default CategoriesClient;