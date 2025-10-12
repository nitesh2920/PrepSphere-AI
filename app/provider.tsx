"use client"
import React,{useEffect} from 'react';
import {useUser} from "@clerk/nextjs"
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import {eq} from "drizzle-orm"
import axios from "axios"
import { ThemeProvider } from './_components/providers/ThemeProvider'
import { GenerationProvider } from './_context/GenerationContext'
import { ProgressProvider } from './_context/ProgressContext'
import { CreditProvider } from './_context/CreditContext'

type ProviderProps = {
  children: React.ReactNode;
};

export function Provider({ children }: ProviderProps) {

  const {user}=useUser();

useEffect(()=>{
user&&checkIsNewUser();
},[user])


  const checkIsNewUser=async ()=>{
    const resp = await axios.post('/api/create-user',{
      user:user
    })
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <GenerationProvider>
        <ProgressProvider>
          <CreditProvider>
            {children}
          </CreditProvider>
        </ProgressProvider>
      </GenerationProvider>
    </ThemeProvider>
  );
}