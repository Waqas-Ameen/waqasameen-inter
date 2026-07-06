import './InputField.css';

const InputField = ({ label, type, name, placeholder, value, onChange, error }) => {
  return (
    <div className="custom-input-group">
      {label && <label className="input-label" htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`custom-input ${error ? 'input-error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputField;
