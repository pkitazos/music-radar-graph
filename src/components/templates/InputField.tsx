import { EditIcon, TickIcon } from "~/SVGs";

const InputField = () => {
  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Field Name"
        className="input w-full max-w-xs bg-neutral"
      />
      <button className="btn-square btn">
        <EditIcon />
      </button>
      <button className="btn-square btn">
        <TickIcon />
      </button>
    </div>
  );
};

export default InputField;
