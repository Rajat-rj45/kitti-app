import type { InputHTMLAttributes } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type FormFieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  hint?: string;
  prefix?: React.ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'id'>;

export function FormField({
  label,
  registration,
  error,
  hint,
  prefix,
  className = '',
  ...inputProps
}: FormFieldProps) {
  const inputId = registration.name;
  const descriptionId = `${inputId}-description`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-bold text-[#16343D]"
      >
        {label}
      </label>

      <div
        className={`flex min-h-14 items-center overflow-hidden rounded-2xl border bg-white transition focus-within:border-[#2DCCD3] focus-within:ring-4 focus-within:ring-[#2DCCD3]/10 ${
          error ? 'border-[#E85661]' : 'border-[#16343D]/12'
        }`}
      >
        {prefix && (
          <span className="flex min-h-14 items-center border-r border-[#16343D]/10 px-4 text-sm font-bold text-[#16343D]">
            {prefix}
          </span>
        )}

        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={descriptionId}
          className={`min-h-14 w-full border-0 bg-transparent px-4 text-base text-[#16343D] outline-none placeholder:text-[#91A4AA] ${className}`}
          {...registration}
          {...inputProps}
        />
      </div>

      <p
        id={descriptionId}
        className={`mt-2 min-h-5 text-sm ${
          error ? 'font-semibold text-[#C93C48]' : 'text-[#6C838A]'
        }`}
      >
        {error?.message ?? hint ?? ''}
      </p>
    </div>
  );
}
