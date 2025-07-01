export  default function Button({ children, onClick, type = "button", className = "", disabled }) {
  return (
    <button
      type={type}
      className={`btn btn-primary ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
