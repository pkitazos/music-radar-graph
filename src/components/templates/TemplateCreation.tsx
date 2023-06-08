import { PlusIcon } from "~/SVGs";
import InputField from "./Inputfield";
import { useEffect, useState } from "react";

const TemplateCreation = () => {
  const [fieldNumber, setFieldNumber] = useState(0);
  const [inputFields, setInputFields] = useState<string[]>([]);

  const handleInputFieldCreation = () => {
    if (fieldNumber != inputFields.length) {
      console.log(
        "it seems you've not finished creating the previous input field"
      );
    } else {
      console.log("you have created a new field");
      setFieldNumber(fieldNumber + 1);
    }
    return;
  };

  useEffect(() => {
    console.log(`${fieldNumber == inputFields.length ? "same" : "different"}`);
    console.log(`${fieldNumber} - ${inputFields.length}`);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      {Array(fieldNumber)
        .fill(0)
        .map((_) => (
          <InputField />
        ))}
      <button className="btn-square btn" onClick={handleInputFieldCreation}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default TemplateCreation;
