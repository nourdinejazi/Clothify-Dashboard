"use client"

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Category } from "@prisma/client";
import { Trash } from "lucide-react";
import { Form, FormControl, FormField, FormLabel, FormMessage ,FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { useState,useEffect } from "react";
import axios from "axios"
import {  useParams, useRouter } from "next/navigation"
import useOrigin from "@/lib/useOrigin";
import { useToast } from "@/components/ui/use-toast"
import { AlertModal } from "@/components/modals/alert-modal";




interface CategoryformProps {
    initialData : Category | null
}

const formSchema =  z.object({
    name: z.string().min(2),
})




type CategoryFormValue = z.infer<typeof formSchema>


const CategoryForm : React.FC<CategoryformProps> = ({
    initialData
}) => {
    const { toast } = useToast()
    const router = useRouter()
    const params = useParams()
    const origin = useOrigin()
    const [loading,setLoading]=useState(false)
    const [open,setOpen]=useState(false)
    const title = initialData ? 'Edit category' : 'Create category';
    const description = initialData ? 'Edit a category.' : 'Add a new category';
    const toastMessage = initialData ? 'Category updated.' : 'Category created.';
    const action = initialData ? 'Save changes' : 'Create';


    const form=useForm<CategoryFormValue>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData || {
            name : '',
        }
    })
    const onSubmit = async (data: CategoryFormValue) => {
        try {
          setLoading(true);
          if (initialData) {
            await axios.patch(`/api/categories/${params.categoryId}`, data);
          } else {
            await axios.post(`/api/categories`, data);
          }
          router.refresh();
          router.push(`/categories`);
          toast({title: toastMessage})
        } catch (error: any) {
            toast({title: "Something went wrong" })
        } finally {
          setLoading(false);
        }
      };

      const OnDelete = async()=>{
        try{
            setLoading(true)
            await axios.delete(`/api/categories/${params.categoryId}`);
            router.refresh();
            router.push(`/categories`);
            toast({title: "Category Deleted"})
        }catch(error){
            toast({title : "Make sure to remove all products and categories first"})
        }finally{
            setLoading(false)
            setOpen(false)
        }
      }

    return ( 
        <>
        <AlertModal 
            isOpen={open}       
            onClose={()=>setOpen(false)} 
            onConfirm={OnDelete}
            loading={loading}    
        />
            <div className="flex items-center ">
                <Heading title={title} description={description} />
                {initialData &&
                <Button
                onClick={() => setOpen(true)}
                disabled={loading}
                variant={"destructive"}
                className="bg-red-500 rounded ml-auto "
                size={"icon"}
                >
                    <Trash />
                </Button>
                }
            </div>
            <Separator className=" mb-8 bg-primary" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={loading} className="w-1/2" placeholder="Category name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button disabled={loading} className="rounded placeholder:ml-auto mt-4" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </> 
    );
}
 
export default CategoryForm;




