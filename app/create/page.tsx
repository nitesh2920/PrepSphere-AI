"use client"
import React, { useState } from 'react';
import SelectOptions from './_components/SelectOptions';
import TopicInput from './_components/TopicInput';
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { useUser } from '@clerk/nextjs'
import {Loader } from "lucide-react";
import {useRouter} from 'next/navigation'
import { toast } from 'sonner';
import { useGeneration } from '@/app/_context/GenerationContext';
import { useCredits } from '@/app/_context/CreditContext';

import { Button } from "@/components/ui/button"
const CreatePage = () => {
  const [step, setStep] = useState(0);
  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const { isGenerating, setIsGenerating } = useGeneration();
  const { credits, useCredit, isMember, refreshCredits } = useCredits();

  const { user } = useUser();

  const router = useRouter()
  
  // Reset generating state when component unmounts (user navigates away)
  React.useEffect(() => {
    return () => {
      // Don't reset the generating state when navigating away
      // It should only be reset when the generation is complete

    };
  }, []);

  const handleUserInput = (fieldName: string, fieldValue: unknown) => {

    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const GenerateCourseOutline = async () => {
    // Check credits before generation
    if (credits <= 0) {
      toast.error("No credits remaining!", {
        description: isMember ? "Your monthly credits have been used up" : "Upgrade to Pro for more credits",
        action: {
          label: isMember ? "Wait for Refresh" : "Upgrade Now",
          onClick: () => {
            if (!isMember) {
              router.push('/dashboard/upgrade')
            }
          }
        }
      });
      return;
    }

    setLoading(true);
    setIsGenerating(true);
    
    try {
      // Step 1: Deduct credit first
      console.log('🔍 Step 1: Deducting credit for user:', user?.primaryEmailAddress?.emailAddress);
      const creditResponse = await axios.post('/api/deduct-credit', {
        userEmail: user?.primaryEmailAddress?.emailAddress
      });

      if (!creditResponse.data.success) {
        throw new Error('Credit deduction failed');
      }

      toast.success(`Credit used! Remaining: ${creditResponse.data.remainingCredits}`);

      // Step 2: Generate course outline
      const courseId = uuidv4()
      const result = await axios.post('/api/generate-course-outline', {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress
      });
      
      // Refresh credits to sync with backend
      refreshCredits();
      
      router.replace('/dashboard')
      toast.success("Course generation started! Check your dashboard.")
    } catch (error: any) {
      console.error('❌ Error in course generation process:', error);
      
      // Handle specific credit-related errors
      if (error.response?.status === 403 && error.response?.data?.needsUpgrade) {
        toast.error("Insufficient credits!", {
          description: "Please upgrade your plan or wait for credits to refresh",
          action: {
            label: "Upgrade Now",
            onClick: () => router.push('/dashboard/upgrade')
          }
        });
      } else if (error.message === 'Credit deduction failed') {
        toast.error("Credit deduction failed!", {
          description: "Unable to deduct credit. Please try again."
        });
      } else {
        toast.error("Failed to generate course. Please try again.");
      }
    } finally {
      setLoading(false);
      // Keep isGenerating true since the content is still being generated in the background
      // It will be reset when the user refreshes or navigates back to dashboard
    }
  }



  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20">
      <h2 className="font-bold text-4xl text-center text-orange-700 dark:text-orange-400 ">
        Start Building Your Personal Study Material
      </h2>
      <p className="text-gray-500 text-lg mt-2 text-center">
        Fill all details in order to generate study
      </p>
      <div className="mt-10">
        {step == 0 ? <SelectOptions selectedStudyType={(value: unknown) => handleUserInput('studyType', value)} /> : <TopicInput setTopic={(value) => handleUserInput('topic', value)}
          setDiffcultyLevel={(value) => handleUserInput('difficultyLevel', value)} />}
      </div>

      <div className={`flex w-full mt-32   ${step !== 0 ? 'justify-between' : 'justify-end'}`}>
        {step != 0 ? <Button variant="outline" onClick={() => setStep(step - 1)}>Prev</Button> : null}
        {step == 0 ? <Button onClick={() => setStep(step + 1)}>Next</Button> :
         <Button onClick={GenerateCourseOutline} disabled={loading || isGenerating}>{
          (loading || isGenerating) ? <Loader className="animate-spin"/>:'Generate'
         }</Button>}
      </div>
    </div>
  );
};

export default CreatePage;