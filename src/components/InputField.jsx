const InputField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  icon,
  helperText,
  autoComplete,
  required,
  disabled
}) => {
  return (
    <div className="custom-input-group">
      {label && <label className="input-label" htmlFor={name}>{label}</label>}
      <div className={`input-wrapper ${icon ? 'has-icon' : ''} ${error ? 'has-error' : ''}`}>
        {icon && <span className="input-icon">{icon}</span>}
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          className={`custom-input ${icon ? 'with-icon' : ''} ${error ? 'input-error' : ''}`}
        />
      </div>
      {helperText && <span className="helper-text">{helperText}</span>}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputField;
