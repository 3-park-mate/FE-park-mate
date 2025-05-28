'use client';
import { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import CommonInputWithLabel from './CommonInputWithLabel';

export default forwardRef(function PasswordInputWithLabel(
  {
    className,
    label,
    id,
    errorMessage,
    ...props
  }: {
    label: string;
    className?: string;
    errorMessage?: string;
  } & React.ComponentProps<'input'>,
  ref: React.Ref<HTMLInputElement>
) {
  const [showPassword, setShowPassword] = useState(false);

  function toggleVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="relative">
      <CommonInputWithLabel
        label={label}
        id={id}
        type={showPassword ? 'text' : 'password'}
        errorMessage={errorMessage}
        className={className}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute top-9 right-4 text-gray-3 cursor-pointer"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
});
