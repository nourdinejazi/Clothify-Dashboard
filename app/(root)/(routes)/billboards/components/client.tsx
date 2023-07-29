"use client"

import { Button } from "@/components/ui/button";
import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter,useParams } from "next/navigation";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";


interface billboardClientProps {
    data  : BillboardColumn []
}

const BillboardClient : React.FC<billboardClientProps> = ({data}) => {

    const router = useRouter()

    return ( 
        <>
            <div className="flex items-center justify-between">
                <Heading   title={`Billboards (${data.length})`} description="Manage billboards for your store" />
                <Button onClick={()=> router.push(`/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable  searchKey="label"   columns={columns} data={data}  />
        </>
     );
}
 
export default BillboardClient;