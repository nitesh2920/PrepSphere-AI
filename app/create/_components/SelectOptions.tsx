"use client"
import React, { useState } from 'react'
import Image from 'next/image'

interface SelectOptionsProps {
    selectedStudyType: (type: string) => void;
}
function SelectOptions({ selectedStudyType }: SelectOptionsProps) {
    const Options = [
        {
            name: 'Exam',
            icon: '/exam_1.png'
        },
        {
            name: 'Coding Prep',
            icon: '/code.png'
        },
        {
            name: 'Job Interview',
            icon: '/job.png'
        },
        {
            name: 'other',
            icon: '/knowledge.png'
        },

    ]
    const [selected, setSelected] = useState<string | undefined>(undefined);


    return (
        <div className="">
            <h2 className="text-center mb-2 text-lg">For which you want to create your personal study material ?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
                {Options.map((option, index) => (
                    <div key={index} onClick={() => { setSelected(option.name); selectedStudyType(option.name) }
                    } className={`border p-4 
            rounded-lg  flex flex-col items-center justify-center m-2 cursor-pointer 
            hover:shadow-lg hover:border ${option.name === selected ? 'border-blue-500 bg-blue-100' : ''}`}
                    >
                        <Image src={option.icon} alt={option.name} width={50} height={50} className="mb-2" />
                        <h2 className="text-sm font-semibold">{option.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SelectOptions