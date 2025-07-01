export default function Input({ type = "text", placeholder, value, onChange, className = "", ...props }) {
  return (
    <input
      type={type}
      className={`form-control ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
