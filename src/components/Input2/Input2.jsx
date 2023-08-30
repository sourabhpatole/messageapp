import React from "react";
import './input2.css';

const Input2 = ({name, value, type, id, onBlur, onChange, onKeyDown}) => {
  return (
    <div className="input-group">
       
      <input
        required
        value={value}
        type={type}
        name="text"
        autoComplete="off"
        className="input2"
        id= {id}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      
       <label className="user-label">{name}</label>
    </div>
  );
};

export default Input2;
