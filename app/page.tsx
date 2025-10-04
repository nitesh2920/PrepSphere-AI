import Image from "next/image";
import {UserButton} from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="flex items-center  justify-center h-[100vh]">
     <h1 className="text-4xl text-white font-bold">PrepSphere AI </h1>

     <UserButton/>
    </div>
  );
}
