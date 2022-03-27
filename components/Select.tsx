const Select = ({
  name,
  label,
  onChange,
  onBlur,
  error,
  options,
  value,
}: {
  name: string;
  label: string;
  onChange: any;
  onBlur?: any;
  error?: string;
  options: Array<{ label: string; value: string }>;
  value: any;
}) => {
  return (
    <div className="form-group mb-6">
      <label
        htmlFor={name}
        className="form-label inline-block mb-1 text-gray-700">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="block w-full rounded-sm h-10 p-1 text-gray-700
        border-gray-300 border shadow-sm focus:border-indigo-300 
          focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <option value="">Select item</option>
        {options.map(({ label, value }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
};

export default Select;
