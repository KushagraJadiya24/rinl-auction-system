// components/ui/Select.jsx
export default function Select({ label, value, onChange, options = [], getLabel = (item) => item, getValue = (item) => item, placeholder = "Select" }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <select className="form-select" value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options.map((item, index) => (
          <option key={index} value={getValue(item)}>
            {getLabel(item)}
          </option>
        ))}
      </select>
    </div>
  );
}
