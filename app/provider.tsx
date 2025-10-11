"use client"
import React,{useEffect} from 'react';
import {useUser} from "@clerk/nextjs"
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import {eq} from "drizzle-orm"
import axios from "axios"

type ProviderProps = {
  children: React.ReactNode;
};

export function Provider({ children }: ProviderProps) {

  const {user}=useUser();

useEffect(()=>{
user&&checkIsNewUser();
},[user])


  const checkIsNewUser=async ()=>{
    // const result=await db.select().from(USER_TABLE)
    // .where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))
    //   console.log(result);
    //   if(result?.length == 0){
    //    const userData = await db.insert(USER_TABLE).values({
    //       name:user?.fullName,
    //       email:user?.primaryEmailAddress?.emailAddress
    //     }).returning({
    //       id:USER_TABLE.id
    //     })
    //     console.log(userData)

    //   }

    const resp = await axios.post('/api/create-user',{
      user:user
    })

    console.log(resp.data)
  }
  return (
    <div>
      {children}
    </div>
  );
}