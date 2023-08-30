import "../../app.css";
import "./input.css";


const Input = ({ label, placeholder, name, type, value, onChange, onBlur, error }) => {
    return (
      <div className="form-control">
        <label className="label">{label}</label>
        <input
          type={type}
          className="input"
          id={label}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error && <div className="error-msg">{error}</div>}
      </div>
    );
  };

  export default Input;