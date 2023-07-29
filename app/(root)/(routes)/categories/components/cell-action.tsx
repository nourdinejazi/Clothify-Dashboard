"use client"

import { CategoryColumn } from "./columns";
import {DropdownMenu,DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import axios from "axios";
interface CellActionProps {
    data : CategoryColumn
}
const CellAction :React.FC<CellActionProps>  = ({
    data
}) => {
    const { toast } = useToast()
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [open ,setOpen]=useState(false)

    const onCopy = (id : string) =>{
        navigator.clipboard.writeText(id)
        toast({title : "Copied" , description : "Id Copied successfully !"});
    }

    const onConfirm = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/categories/${data.id}`);
          toast({title : "Category Deleted"});
          router.refresh();
        } catch (error) {
          toast({title : "Something went wrong"});
        } finally {
          setLoading(false);
        }
      };
    return (
        <>
        <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        />
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-transparent" >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal  className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                onClick={()=>onCopy(data.id)}
                >
                <Copy className="mr-2 h-4 w-4" /> Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem
                onClick={()=>router.push(`/categories/${data.id}`)}
                >
                <Edit className="mr-2 h-4 w-4" /> Update
                </DropdownMenuItem>
                <DropdownMenuItem
                onClick={() => setOpen(true)}
                >
                <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
}
 
export default CellAction;