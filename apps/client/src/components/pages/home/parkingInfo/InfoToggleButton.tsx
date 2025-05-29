import { ChevronDown, ChevronUp } from 'lucide-react';

export default function InfoToggleButton({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  return (
    <div className="relative mx-auto pt-3">
      <hr />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-1/2 -translate-x-1/2 -bottom-5 
          bg-yellow-2 w-10 h-10 rounded-full shadow-lg 
          flex justify-center items-center cursor-pointer"
      >
        {isOpen ? (
          <ChevronUp className="text-white" size={16} />
        ) : (
          <ChevronDown className="text-white" size={16} />
        )}
      </button>
    </div>
  );
}
