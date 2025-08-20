import { useId } from 'react'

const INPUT_STYLE =
  'py-2 px-4 bg-white rounded-md outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400 transition'

export default function InputField(data) {
  const {
    label,
    name,
    type = 'text',
    placeholder,
    autoComplete,
    required,
    value,
    error,
    onChange,
  } = data

  const autoId = useId()
  const id = `${name}-${autoId}`
  const errorId = `${id}-error`

  return (
    <fieldset className="grid mb-5">
      <legend className="mb-1 font-semibold">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </legend>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={INPUT_STYLE + (error ? ' ring-2 ring-red-400 focus:ring-red-500' : '')}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </fieldset>
  )
}
