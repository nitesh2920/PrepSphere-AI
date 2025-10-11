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

import { Button } from "@/components/ui/button"
const CreatePage = () => {
  const [step, setStep] = useState(0);
  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState<Record<string, unknown>>([]);

  const { user } = useUser();

  const router = useRouter()
  const handleUserInput = (fieldName: string, fieldValue: unknown) => {

    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))

    console.log(formData)
  }

  const GenerateCourseOutline = async () => {
    setLoading(true);
    const courseId = uuidv4()
    const result = await axios.post('/api/generate-course-outline', {
      courseId: courseId,
      ...formData,
      createdBy: user?.primaryEmailAddress?.emailAddress

    });
    setLoading(false)
    router.replace('/dashboard')
    toast("Your course content is generating, Click on Refresh Button")

    console.log(result.data.result.resp)

  }



  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20">
      <h2 className="font-bold text-4xl text-center text-purple-700 ">
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
         <Button onClick={GenerateCourseOutline} disabled={loading}>{
          loading?<Loader className="animate-spin"/>:'Generate'
         }</Button>}
      </div>
    </div>
  );
};

export default CreatePage;