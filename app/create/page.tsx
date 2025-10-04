import React from 'react';
import SelectOptions from './_components/SelectOptions';

const CreatePage = () => {
  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20">
      <h2 className="font-bold text-4xl text-center">
        Start Building Your Personal Study Material
      </h2>
      <p className="text-gray-500 text-lg mt-2 text-center">
        Fill all details in order to generate study 
      </p>
      <SelectOptions />
    </div>
  );
};

export default CreatePage;