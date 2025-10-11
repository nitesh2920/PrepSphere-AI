"use client"
import React from "react"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Difficulty = 'Easy' | 'Moderate' | 'Hard' | string ;

type TopicInputProps = {
  setTopic: (topic: string) => void;
  setDiffcultyLevel: (level: Difficulty) => void;
}

const TopicInput = ({setTopic,setDiffcultyLevel}:TopicInputProps) => {
    return (
        <div>
            <h2>Enter topic or paster the content for which you want to genreate the study material </h2>
            <Textarea placeholder="start writing here" onChange={(event)=>setTopic(event.target.value)} className="mt-2 focus-visible:ring-0" />
            <h2 className="mt-5 mb-3"> Select the diffculty level</h2>
            <Select onValueChange={(value=>setDiffcultyLevel(value))}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Diifculty level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default TopicInput;