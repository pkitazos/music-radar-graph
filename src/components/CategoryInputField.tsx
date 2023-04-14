import { FC, useState } from "react";

interface props {
  label: string;
}

const CategoryInputField: FC<props> = ({ label }) => {
  const [userInput, setUserInput] = useState("");
  const [updatedInput, setUpdatedInput] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setUpdatedInput(userInput);
    }
  };
  return (
    <>
      <div className='flex flex-col gap-5'>
        <div className='-mb-3'>{label}</div>
        <div className='flex items-center gap-5'>
          <input
            type='number'
            pattern='[1-9]|10'
            placeholder='Type here'
            className='input input-bordered w-full max-w-xs'
            defaultValue={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <div className='px-4 py-2 w-max text-secondary font-medium text-lg border-2 border-pink-600'>
            {"0" || updatedInput}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryInputField;
