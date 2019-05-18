import React from 'react'

export default function Select({name, id, value, onChange, options}) {
  return (
    <select name={name} id={id} onChange={onChange} value={value}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}