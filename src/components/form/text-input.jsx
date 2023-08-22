import camelCase from "lodash.camelcase";
import capitalize from "lodash.capitalize";
import startCase from "lodash.startcase";

// Typically `id`s are kebab-case, but we want to use camelCase for the 'name' attribute.
export default function TextInput({
  id,
  label,
  placeholder,
  defaultValue,
  required = true,
  type = "text",
}) {
  return (
    <div>
      <label className="sr-only" htmlFor={id}>
        {label || placeholder || capitalize(id)}
      </label>
      <input
        type={type}
        id={id}
        name={camelCase(id)}
        placeholder={placeholder || startCase(id)}
        required={required}
        defaultValue={defaultValue}
      />
    </div>
  );
}
