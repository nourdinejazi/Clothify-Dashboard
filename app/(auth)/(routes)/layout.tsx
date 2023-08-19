import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-10 ">
        <div className="gap-5  text-3xl  py-8  flex flex-col items-center justify-center">
              <span className="text-red-500 text-lg">Only authorized users can submit changes to this project (delete,add,update... ) </span>
              <span>username : dummyuser</span>
              <span>password : 12345   </span>
              <span className="text-neutral-400"> or u can simply connect with your google account</span>
              <span className="text-lg "> admin interface for  : <Link className="underline text-blue-500" target="_" href={"https://clothify-store.vercel.app/"}>clothify-store.vercel.app</Link> </span>
        </div>
      {children}
    </div>
  );
};