import { GoogleGenAI, Schema, Type } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

export async function getCourseOutline(prompt: string): Promise<string> {
  const courseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      course_title: { type: Type.STRING },
      difficulty_level: { type: Type.STRING },
      target_audience: { type: Type.STRING },
      course_summary: { type: Type.STRING },
      chapters: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            chapter_number: { type: Type.NUMBER },
            chapter_title: { type: Type.STRING },
            chapter_summary: { type: Type.STRING },
            emoji: { type: Type.STRING },
            topics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["chapter_number", "chapter_title", "chapter_summary", "topics"],
        },
      },
    },
    required: ["course_title", "difficulty_level", "target_audience", "course_summary", "chapters"],
  };

  const config = {
    responseMimeType: "application/json",
    responseSchema: courseSchema,
    thinkingConfig: {
      thinkingBudget: -1,
    },
  };

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config,
  });

  const response = result.text ?? '';
  
  return response;
}


export async function generateNotesAIModel(prompt: string): Promise<string> {
  const tools = [
    {
      googleSearch: {},
    },
  ];

  const config = {
    responseMimeType:'text/html',
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents,
    config,
  });

    const result = response.text ?? '';
    // console.log("AI Response:", result);

  return result;

}